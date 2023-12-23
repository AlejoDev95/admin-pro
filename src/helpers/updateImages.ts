import fs from "fs";
import path from "path";

export const updateImage = async (params: UpdateImageModel) => {
  let oldPath = path.join(__dirname, `../../uploads/${params.type}`);

  // Deleting image if exists
  oldPath += `/${params.schemaSelected?.image}`;
  console.log({ oldPath });
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }
  params.schemaSelected.image = params.fileName;
  await params.schemaSelected.save();
  return true;
};

export type UpdateImageModel = {
  type: "doctors" | "hospitals" | "users";
  schemaSelected: any;
  fileName: string;
};
