import React from "react";
import ReactDOM from "react-dom";
import { storage } from "../firebase";
import { Progress, Columns, Column, Notification, Help } from "bloomer";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      task: null,
      error: null,
      canceled: null,
      uploadState: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    this.state.task && this.state.task.cancel();
    this.setState({ task: null, progress: 0, canceled: true, error: null });
  }

  notification(content, type) {
    return (
      <Help isColor={type}>
        {" "}
        <p>{content}</p>
      </Help>
    );
  }

  handleProgress(num) {
    this.setState({ progress: num });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState(() => ({ file }));
      this.handleUpload();
      console.log(file);
      const name = +new Date() + "-" + file.name;
      const metadata = { contentType: file.type };
      const task = storage
        .ref(`carpeta/${this.props.code}`)
        .put(file, metadata);
      this.setState({ task: task, canceled: null });
      task.on("state_changed", snapshot => {
        var progreso = (100 * snapshot.bytesTransferred) / snapshot.totalBytes;
        console.log(progreso);
        this.handleProgress(progreso);
        this.setState({ uploadState: snapshot.state });
      });
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          document.querySelector("#someImageTagID").src = url;
        })
        .catch(error => {
          this.setState({ error: error.code });
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        });
    }
  };

  handleUpload = () => {
    const { file } = this.state;
    console.log(file);
  };

  componentWillUnmount() {
    this.cancel();
  }

  render() {
    return (
      <div className={"Uploader"}>
        <div style={{ marginBottom: "24px" }} className="field">
          <div
            className={
              "file is-" +
              this.props.mode +
              " has-name is-boxed is-" +
              this.props.color
            }
          >
            <label
              style={{
                cursor:
                  this.state.progress > 0 && this.state.progress < 100
                    ? "default"
                    : "pointer"
              }}
              className="file-label"
            >
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={this.handleChange}
                disabled={this.state.progress > 0 && this.state.progress < 100}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-cloud-upload-alt" />
                </span>
                <span
                  style={{
                    cursor:
                      this.state.progress > 0 && this.state.progress < 100
                        ? "default"
                        : "pointer"
                  }}
                  className="file-label"
                >
                  {(this.state.progress == 0 && "Subir archivo…") ||
                    (this.state.progress == 100 && "Remplazar archivo") ||
                    "Subiendo archivo..."}
                </span>
              </span>

              {this.state.progress ? (
                this.state.progress != 100 ? (
                  <span className="file-name">
                    <Columns>
                      <Column>
                        <progress
                          className="progress"
                          value={this.state.progress}
                          max="100"
                        />
                      </Column>
                      <Column isSize={2}>
                        <a
                          onClick={event => {
                            event.preventDefault();
                            this.cancel();
                          }}
                          className="is-small delete"
                        />
                      </Column>
                    </Columns>
                  </span>
                ) : (
                  <div>
                    <span className="file-name">
                      {/*this.state.error ? (
                        <i className="fas fa-close" />
                      ) : (
                        <i className="fas fa-check" />
                      )*/}{" "}
                      {this.state.error || this.state.file.name}
                    </span>
                  </div>
                )
              ) : (
                undefined
              )}
            </label>
          </div>
          {this.state.progress == 100 &&
            !this.state.error &&
            this.notification("Archivo subido con éxito", "success")}
          {this.state.error &&
            this.notification('Error: "' + this.state.error + '"', "danger")}
          {this.state.canceled &&
            !this.state.error &&
            this.notification("Envío cancelado", "danger")}
        </div>
      </div>
    );
  }
}

export default Uploader;
