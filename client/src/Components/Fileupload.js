import React, { Fragment, useState } from "react";
import { Button, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import AlertDismissible from "./AlertDismissible";
import ProgressBar from "./Progress";

const { REACT_APP_API } = process.env;

export const Fileupload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const setErrorMessage = (message) => {
    setIsError(true);
    setMessage(message);
  };

  const dehydrateState = () => {
    clearMessage();
    setFile(null);
    setFileName("Choose File");
  };

  const clearMessage = () => {
    setUploadPercentage(0);
    setIsError(false);
    setMessage("");
  };

  const onChange = ({ target }) => {
    setFile(target.files[0]);
    setFileName(target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${REACT_APP_API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
        onDownloadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(!isError && dehydrateState, 10000);
        },
      });

      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File uploaded");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage("There is problem with server");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Fragment>
      <Row md>
        <AlertDismissible message={message} onClose={setMessage} block={true} />
      </Row>

      <Form onSubmit={onSubmit}>
        <Row>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {fileName}
            </label>
          </div>
          <ProgressBar percentage={uploadPercentage} isFailed={isError} />
          <Button type="submit" className="btn-block mt-4">
            Submit
          </Button>
        </Row>
      </Form>

      <Row
        className="mt-5 justify-content-md-center"
        hidden={!uploadedFile.fileName}
      >
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`${REACT_APP_API}${uploadedFile.filePath}`}
          />
          <Card.Body>
            <Card.Title>{uploadedFile.fileName}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Fragment>
  );
};
