import { createContext,useContext,useCallback,useEffect,useState,
    useMemo
 } from "react";
 import { supabase } from "../utils/supabase";

const AuthContext=createContext(undefined);

export function AuthProvider({children}){
    const [user,setUser]=useState(null);
    const [session,setSession]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
            setUser(session?.user || null);
            setLoading(false);
        });

        const {
            data:{subscription},
        }=supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
            setUser(session?.user || null);
            setLoading(false);
        });
        return ()=>{
            subscription.unsubscribe();
        };
    },[]);

    const signIn=useCallback(async(identifier,password)=>{
        let emailToUse=identifier;

        if(!identifier.includes("@")){
            const {data:profile,error:profileError}=await supabase
            .from("profiles")
            .select("email")
            .eq("username",identifier)
            .single();
            if(profileError || !profile){
                return {error: {message:"Couldn't find this username"}};

            }
            emailToUse=profile.email;
        }

        const {error}=await supabase.auth.signInWithPassword({
            email:emailToUse,
            password,
        });

        return {error};
    },[]);


    const signUp=useCallback(async (email,password,username)=>{
        const {data,error}=await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    username:username,
                },
            },
        });
        if(!error && data.user){
            await supabase.from("profiles").insert([
                {
                    id:data.user.id,
                    username:username,
                    email:email,
                },
            ]);
        }
        return {error};
    },[]);
    const signOut=useCallback(async()=>{
        await supabase.auth.signOut();
    },[]);

    const value=useMemo(
        ()=>({
            user,
            session,
            loading,
            signIn,
            signUp,
            signOut,

        }),
        [user,session,loading,signIn,signUp,signOut]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth trebuie folosit in interiorul unui Provider");

    }
    return context;
}