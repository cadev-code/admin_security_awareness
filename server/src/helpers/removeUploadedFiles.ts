import fs from 'fs';

export const removeUploadedFiles = (
  files: { fieldname: string; filename: string; path: string }[],
) => {
  if (files && files.length > 0) {
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) throw err;
      });
    });
  }
};
