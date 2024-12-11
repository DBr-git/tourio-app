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
    console.log("get method in dynamic route");
    response.status(200).json(location);
    return;
  }

  if (request.method === "PUT") {
    const location = await Location.findByIdAndUpdate(id, request.body);

    if (!location) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    console.log("put method in dynamic route");
    response.status(200).json(location);
    return;
  }

  if (request.method === "DELETE") {
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      response.status(404).json({ status: "Not found" });
      return;
    }
    console.log("delete method in dynamic route");
    response.status(200).json({ status: "Location deleted" });
    return;
  }
}
