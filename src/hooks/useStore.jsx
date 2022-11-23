import React, {useContext} from "react";
import AppContext from "../context/AppContext";
import {dispatch} from "../context/AppProvider";

function useStore(){
	const context = useContext(AppContext)
	return [context, dispatch]
	
}
export default useStore

