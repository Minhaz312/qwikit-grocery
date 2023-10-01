"use client"
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({children,show,hideHeader=false,hideFooter=false,title,onActionTitle,onHide=()=>{},onAction=()=>{}}) {
  return (
    <div className={`${show?"fixed":"hidden"} z-[1000] w-full h-full top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto`}>
        <div className="bg-white rounded">
            <div className="min-w-full md:min-w-[400px] min-h-[100px] md:min-h-[150px] flex justify-between flex-col p-3">
                {hideHeader===false&&(<div className="flex justify-between items-center">
                    <h3>{title}</h3>
                    <button onClick={onHide}><AiOutlineClose /></button>
                </div>)}
                <div>{children}</div>
                {
                    hideFooter===false?<div className="flex justify-end mt-3">
                    <div>
                        <button className="px-2 py-1 bg-slate-800 rounded text-white font-semibold text-[12px] mr-2" onClick={onHide}>Close</button>
                        <button  className="px-2 py-1 bg-green-800 rounded text-white font-semibold text-[12px]" onClick={onAction}>{onActionTitle}</button>
                    </div>
                </div>:<span></span>
                }
            </div>
        </div>        
    </div>
  )
}
