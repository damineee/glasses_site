import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

const ORDER_SELECT = `
  id,
  status,
  total_price,
  payment_method,
  created_at,
  shipping_addresses ( full_name, address_line1, address_line2, city, state, zip_code,country ,phone ),
  order_items (
    id,
    quantity,
    unit_price,
    size_slug,
    product_variants ( main_image_url, color_name, products ( name ) ),
    prescription_types ( name ),
    lens_types ( name ),
    lens_colors ( name ),
    lens_materials ( name )
  )
`;

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .eq("id", orderId)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 pt-24 text-gray-500 font-medium">
        Loading your order...
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] pt-24 gap-4">
        <h2 className="text-[26px] font-serif">Order not found</h2>
        <Link
          to="/my-orders"
          className="text-blue-700 font-semibold hover:underline"
        >
          View your orders
        </Link>
      </div>
    );
  }

  const addr = order.shipping_addresses;

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-25 xl:pt-32 pb-16">
      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-[28px] sm:text-[34px] font-serif">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 text-[15px]">
          Order <span className="font-semibold">#{order.id.slice(0, 13)}</span>{" "}
          has been placed successfully.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[15px]">Order status</span>
          <StatusBadge status={order.status} />
        </div>

        <div className="h-[1px] bg-gray-100" />

        <div className="flex flex-col gap-4">
          {order.order_items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start">
              <div className="w-16 h-16 bg-[#FCFBF9] rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.product_variants?.main_image_url}
                  alt={item.products?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-[15px]">
                    {item.product_variants?.products?.name}
                  </p>
                  <p className="font-semibold text-[15px]">
                    ${item.unit_price.toFixed(2)}
                  </p>
                </div>
                <p className="text-[13px] text-gray-600">
                  {item.product_variants?.color_name} · {item.size_slug} · {" "}
                  {item.quantity}
                </p>
                {item.prescription_types && (
                  <p className="text-[13px] text-gray-600">
                    {item.prescription_types.name}
                    {item.lens_types && ` · ${item.lens_types.name}`}
                    {item.lens_colors && ` (${item.lens_colors.name})`}
                    {item.lens_materials && ` · ${item.lens_materials.name}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-gray-100" />

        <div className="flex justify-between text-[17px] font-bold">
          <span>Total</span>
          <span>${order.total_price.toFixed(2)}</span>
        </div>

        <div className="h-[1px] bg-gray-100" />

        <div>
          <p className="font-semibold text-[15px] mb-1">Shipping to</p>
          <p className="text-[14px] text-gray-700">{addr?.full_name}</p>
          <p className="text-[14px] text-gray-700">
            {addr?.address_line1}
            {addr?.address_line2 ? `, ${addr.address_line2}` : ""}
          </p>
          <p className="text-[14px] text-gray-700">
            {addr?.country}, {addr?.city}
            {addr?.state ? `, ${addr.state}` : ""} {addr?.zip_code}
          </p>
          <p className="text-[14px] text-gray-600 mt-1">{addr?.phone}</p>
        </div>

        <div>
          <p className="font-semibold text-[15px] mb-1">Payment method</p>
          <p className="text-[14px] text-gray-700 capitalize">
            {order.payment_method?.replaceAll("_", " ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link
          to="/my-orders"
          className="flex-1 text-center border border-gray-300 rounded-full py-3 font-semibold hover:border-gray-600 transition-colors"
        >
          View my orders
        </Link>
        <Link
          to="/eyeglasses"
          className="flex-1 text-center bg-[#1050D0] text-white rounded-full py-3 font-semibold hover:bg-[#0c3fb3] transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    shipped: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`text-[12px] font-semibold px-3 py-1 rounded-full capitalize ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}
