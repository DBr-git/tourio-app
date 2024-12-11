import dbConnect from "@/db/connect";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const locations = await Location.find();

    console.log("get method in static route");
    response.status(200).json(locations);
    return;
  }

  if (request.method === "POST") {
    await Location.create(request.body);

    console.log("post method in static route");
    response.status(200).json({ status: "Location created" });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
