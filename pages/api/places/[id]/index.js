import dbConnect from "@/db/connect.js";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const location = await Location.findById(id);

    if (!location) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    console.log("dynamic api route called");
    response.status(200).json(location);
    return;
  }
}
