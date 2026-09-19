import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";

const ORDER_SELECT = `
  id,
  status,
  total_price,
  payment_method,
  created_at,
  shipping_addresses ( full_name,country, address_line1,address_line2, city, zip_code ),
  order_items (
    id,
    quantity,
    unit_price,
    size_slug,
    product_variants ( main_image_url, color_name,color_name_slug, products( name,category,slug ) ),
    prescription_types ( name ),
    lens_types ( name ),
    lens_colors ( name ),
    lens_materials ( name )
  )
`;

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Cancel this order?")) return;

    setCancellingId(orderId);
    const prevOrders = orders;

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
    );

    const { error } = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId);

    if (error) {
      console.error("Error cancelling order:", error.message);
      setOrders(prevOrders); 
      alert("Could not cancel this order. Please try again.");
    }
    setCancellingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 pt-24 text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] pt-24 gap-4">
        <h2 className="text-[26px] font-serif">You have no orders yet</h2>
        <Link
          to="/eyeglasses"
          className="px-6 py-2.5 bg-[#1050D0] text-white rounded-full text-sm font-semibold hover:bg-[#0c3fb3] transition-colors"
        >
          Shop eyeglasses
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 pt-25 xl:pt-32 pb-16">
      <h2 className="text-[26px] sm:text-[32px] font-serif mb-6">
        Your orders
      </h2>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <p className="font-semibold">Order #{order.id.slice(0, 13)}</p>
                <p className="text-[13px] text-gray-600">
                  {order?.created_at
                    ? new Date(order.created_at).toLocaleString("ro-RO", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Data necunoscută"}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {order.order_items.map((item) => (
                <Link
                  to={`/${item.product_variants?.products?.category}/${item.product_variants?.products?.slug}/${item.product_variants?.color_name_slug}?w=${item.size_slug}`}
                  key={item.id}
                  className="flex gap-3 items-center"
                >
                  <div className="w-14 h-14 bg-[#FCFBF9] rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.product_variants?.main_image_url}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[14px]">
                      {item.product_variants?.products?.name}
                    </p>
                    <p className="text-[13px] text-gray-600 ">
                      {item.product_variants?.color_name} · {item.size_slug} ·{" "}
                      {""} {item.quantity}
                    </p>
                    {item.prescription_types && (
                      <p className="text-[13px] text-gray-600">
                        {item.prescription_types.name}
                        {item.lens_types && ` · ${item.lens_types.name}`}
                        {item.lens_colors && ` (${item.lens_colors.name})`}
                        {item.lens_materials &&
                          ` · ${item.lens_materials.name}`}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <p className="text-[13px] text-gray-600">
                Shipping to {order.shipping_addresses?.country},{" "}
                {order.shipping_addresses?.city},{" "}
                {order.shipping_addresses?.address_line1}{" "}
                {order.shipping_addresses?.address_line2
                  ? `, ${order.shipping_addresses?.address_line2}`
                  : ""}
              </p>
              <p className="font-bold">${order.total_price.toFixed(2)}</p>
            </div>

            {order.status === "pending" && (
              <button
                onClick={() => handleCancelOrder(order.id)}
                disabled={cancellingId === order.id}
                className="mt-3 text-[13px] py-2 px-3 rounded-md bg-red-100 opacity-80 hover:opacity-100 text-red-600 font-semibold  disabled:opacity-50 cursor-pointer"
              >
                {cancellingId === order.id ? "Cancelling..." : "Cancel order"}
              </button>
            )}
          </div>
        ))}
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
