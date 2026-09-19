import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../utils/supabase";

const CartContext = createContext();

const CART_ITEM_SELECT = `
  id,
  variant_id,
  size_slug,
  quantity,
  unit_price,
  prescription_types ( id, name, base_price ),
  reader_strengths ( id, label,value ),
  lens_types ( id, name, extra_price ),
  lens_colors ( id, name ,
  variant_lens_previews(image_url,variant_id)),
  lens_materials ( id, name, extra_price ),
  product_variants (
    id,
    color_name,
    color_name_slug,
    main_image_url,
    products ( id, name, slug, category )
  )
`;

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedUserRef = useRef(null);
  const pendingRef = useRef(new Set());

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCartItems([]);
        setLoading(false);
        fetchedUserRef.current = null;
        return;
      }

      if (user.id === fetchedUserRef.current) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("order_items")
        .select(CART_ITEM_SELECT)
        .eq("user_id", user.id)
        .is("order_id", null)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching cart:", error.message);
      } else {
        setCartItems(data || []);
        fetchedUserRef.current = user.id;
      }
      setLoading(false);
    };

    fetchCart();
  }, [user]);

  const addToCart = async (itemConfig) => {
    if (!user) {
      alert("Please log in to add items to your cart!");
      return;
    }

    const {
      variantId,
      sizeSlug = "medium",
      prescriptionTypeId,
      readerStrengthId,
      lensTypeId,
      lensColorId,
      lensMaterialId,
      unitPrice,
    } = itemConfig;

    const { data, error } = await supabase
      .from("order_items")
      .insert([
        {
          user_id: user.id,
          variant_id: variantId,
          size_slug: sizeSlug,
          prescription_type_id: prescriptionTypeId,
          reader_strength_id: readerStrengthId,
          lens_type_id: lensTypeId,
          lens_color_id: lensColorId,
          lens_material_id: lensMaterialId,
          unit_price: unitPrice,
          quantity: 1,
        },
      ])
      .select(CART_ITEM_SELECT)
      .single();

    if (error) {
      console.error("Error adding to cart:", error.message);
      throw error;
    }

    setCartItems((prev) => [...prev, data]);
    return data;
  };

  const removeFromCart = async (itemId) => {
    if (pendingRef.current.has(itemId)) return;
    pendingRef.current.add(itemId);

    const existing = cartItems.find((i) => i.id === itemId);
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));

    try {
      const { error } = await supabase
        .from("order_items")
        .delete()
        .eq("id", itemId);
      if (error) {
        console.error("Error removing from cart:", error.message);
        if (existing) setCartItems((prev) => [...prev, existing]);
      }
    } finally {
      pendingRef.current.delete(itemId);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    const prevItems = cartItems;
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    );

    const { error } = await supabase
      .from("order_items")
      .update({ quantity })
      .eq("id", itemId);

    if (error) {
      console.error("Error updating quantity:", error.message);
      setCartItems(prevItems); // rollback
    }
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = async () => {
    
    setCartItems([]);

  
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        itemsTotal,
        cartCount,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
