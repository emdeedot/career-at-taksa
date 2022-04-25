import { useState } from "react";
import PropTypes from "prop-types";
import { FormLabel, Box, Typography, Button, FormHelperText } from "@mui/material";
import { UploadFile, AttachFile, Article } from "@mui/icons-material";
import Dropzone from "react-dropzone";

const UploadInput = ({ name, label, value, onChange, error, helperText = null }) => {
  const [fileName, setFileName] = useState(value?.name ?? "");

  const onDrop = (acceptedFiles) => {
    onChange(name, acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);
  };

  const onRemove = (e) => {
    e.stopPropagation();
    onChange(name, null);
    setFileName("");
  };

  return (
    <Box sx={{ mt: 1 }}>
      <FormLabel component="legend" error={error}>{label}</FormLabel>
      <Box
        sx={{
          borderRadius: "4px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
          p: 2,
          mt: 0.5,
          mb: 1.5,
          opacity: fileName ? 1 : 0.75,
        }}
      >
        <Dropzone multiple={false} onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: "104px",
                }}
              >
                {isDragActive && (
                  <>
                    <AttachFile />
                    <Typography variant="subtitle2">Drop your file here to attach</Typography>
                  </>
                )}
                {!isDragActive && !fileName && (
                  <>
                    <UploadFile />
                    <Typography variant="subtitle2">Drag & drop your file here</Typography>
                    <Typography variant="caption">or</Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Button variant="text" color="primary">
                        Browse files
                      </Button>
                    </Box>
                  </>
                )}
                {!isDragActive && fileName && (
                  <>
                    <Article />
                    <Typography variant="caption">File attached</Typography>
                    <Typography variant="subtitle2">{fileName}</Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={0}>
                      <Button variant="text" color="error" onClick={onRemove}>
                        Remove
                      </Button>
                      <Button variant="text" color="primary">
                        Change file
                      </Button>
                    </Box>
                  </>
                )}

              </Box>
            </div>
          )}
        </Dropzone>
      </Box>
      <FormHelperText sx={{ mt: 0, mx: 1.5 }} error={error}>{helperText}</FormHelperText>
    </Box>
  );
};

UploadInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(File),
};
UploadInput.defaultProps = {
  helperText: null,
  value: null,
};

export default UploadInput;
