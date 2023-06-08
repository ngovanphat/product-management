"use client";
import { Loading } from "@/components/organism/Loading";
export default function ProductDetail({ params }: any) {
  return <p>Product id: {params.id}</p>;
}
