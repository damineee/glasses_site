import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../utils/supabase";

const FavoritesContext = createContext();
const FAVORITE_SELECT = `
  id,
  variant_id,
  size_slug,
  product_variants (
    id,
    color_name_slug,
    color_hex,
    main_image_url,
    product_sizes ( size_name_slug ),
    products (
      id,
      name,
      slug,
      category,
      base_price,
      product_variants (
        id,
        color_name_slug,
        color_hex,
        main_image_url
      )
    )
  )
`;
export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedUserRef = useRef(null);
  const pendigRef=useRef(new Set());

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        fetchedUserRef.current = null;
        return;
      }
      if (user?.id === fetchedUserRef.current ) {
        return;
      }

      setLoading(true);



      const { data, error } = await supabase
        .from("favorites")
        .select(FAVORITE_SELECT)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error.message);
      } else {
        setFavorites(data || []);
        fetchedUserRef.current = user.id;
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (variantId, sizeSlug = "medium") => {
    if (!user) {
      alert("Please log in to save items to your favorites!");
      return;
    }

    const key=`${variantId}-${sizeSlug}`;

    if(pendigRef.current.has(key)) return;
    pendigRef.current.add(key);
    try{
      const existingFav = favorites.find(
      (f) => f.variant_id === variantId && f.size_slug === sizeSlug,
    );
    

    

    if (existingFav) {
      
      setFavorites((prev) => prev.filter((f) => f.id !== existingFav.id));

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", existingFav.id);

      if (error) {
        console.error("Error removing favorite:", error.message);
        
        setFavorites((prev) => [...prev, existingFav]);
      }
    } else {
     
     const tempId = crypto.randomUUID();
        const tempFav = { id: tempId, variant_id: variantId, size_slug: sizeSlug };

      setFavorites((prev) => [...prev, tempFav]);

       const { data, error } = await supabase
          .from("favorites")
          .insert([{ user_id: user.id, variant_id: variantId, size_slug: sizeSlug }])
          .select(FAVORITE_SELECT)
          .single();

      if (error) {
        console.error("Error adding favorite:", error.message);
        
        setFavorites((prev) => prev.filter((f) => f.id !== tempId));
      } else if (data) {
        
        setFavorites((prev) =>
          prev.map((f) => (f.id === tempId ? data : f)),
        );
      }
    }
    } finally {
       pendigRef.current.delete(key);
    }
  };

  const isFavorite = (variantId, sizeSlug = "medium") => {
    return favorites.some(
      (f) => f.variant_id === variantId && f.size_slug === sizeSlug,
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
