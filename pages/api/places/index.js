import dbConnect from "@/db/connect";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const locations = await Location.find();

    console.log("static api route called");
    response.status(200).json(locations);
    return;
  }
}
