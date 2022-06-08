import { useEffect, useState } from "react";
/*useMounted() is a simple hook used to prevent react hydration issues. The hook provides us the information about
 the component being rendered.  That way we can set the actual amount of items in cart after the first render and 
 end up with the server content initially being the same than the client content*/

export const useMounted = () => {
 const [hasMounted, setHasMounted] = useState(false);

 useEffect(() => {
  setHasMounted(true);
 }, []);

 return { hasMounted };
};
