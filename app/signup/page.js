async function handleSignup(){
  if(!email || !password){
    setMsg("Enter email & password");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options:{
      emailRedirectTo:"https://linkarsha-next.vercel.app/signup"
    }
  });

  if(error){
    setMsg(error.message);
    return;
  }

  setMsg("Check your email to confirm. Then login.");
}
