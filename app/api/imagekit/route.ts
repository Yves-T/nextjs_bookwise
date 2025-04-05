import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const { publicKey, privateKey, urlEndpoint } = config.env.imagekit;

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
