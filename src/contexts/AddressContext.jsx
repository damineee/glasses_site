import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../utils/supabase";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedUserRef = useRef(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) {
        setAddresses([]);
        setLoading(false);
        fetchedUserRef.current = null;
        return;
      }
      if (user.id === fetchedUserRef.current) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("shipping_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching addresses:", error.message);
      } else {
        setAddresses(data || []);
        fetchedUserRef.current = user.id;
      }
      setLoading(false);
    };

    fetchAddresses();
  }, [user]);

  const addAddress = async (addressData) => {
    if (!user) return;

  
    const shouldBeDefault = addresses.length === 0 || addressData.is_default;

    if (shouldBeDefault) {
     
      setAddresses((prev) => prev.map((a) => ({ ...a, is_default: false })));
      await supabase
        .from("shipping_addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { data, error } = await supabase
      .from("shipping_addresses")
      .insert([
        { ...addressData, user_id: user.id, is_default: shouldBeDefault },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding address:", error.message);
      throw error;
    }

    setAddresses((prev) => [data, ...prev]);
    return data;
  };

  const removeAddress = async (addressId) => {
    const existing = addresses.find((a) => a.id === addressId);
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));

    const { error } = await supabase
      .from("shipping_addresses")
      .delete()
      .eq("id", addressId);
    if (error) {
      console.error("Error removing address:", error.message);
      if (existing) setAddresses((prev) => [...prev, existing]);
    }
  };
const updateAddress = async (addressId, addressData) => {
  const prevAddresses = addresses;
  setAddresses((prev) =>
    prev.map((a) => (a.id === addressId ? { ...a, ...addressData } : a)),
  );

  const { error } = await supabase
    .from("shipping_addresses")
    .update(addressData)
    .eq("id", addressId);

  if (error) {
    console.error("Error updating address:", error.message);
    setAddresses(prevAddresses); // rollback
    throw error;
  }
};

const setDefaultAddress = async (addressId) => {
  const prevAddresses = addresses;
  setAddresses((prev) =>
    prev.map((a) => ({ ...a, is_default: a.id === addressId })),
  );

  // scoatem default-ul de pe toate, apoi îl punem pe cea aleasă
  const { error: clearError } = await supabase
    .from("shipping_addresses")
    .update({ is_default: false })
    .eq("user_id", user.id);

  if (clearError) {
    console.error("Error clearing default:", clearError.message);
    setAddresses(prevAddresses);
    return;
  }

  const { error } = await supabase
    .from("shipping_addresses")
    .update({ is_default: true })
    .eq("id", addressId);

  if (error) {
    console.error("Error setting default address:", error.message);
    setAddresses(prevAddresses);
  }
};
  return (
    <AddressContext.Provider
      value={{ addresses, addAddress, removeAddress,updateAddress,setDefaultAddress, loading }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => useContext(AddressContext);
