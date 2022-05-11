export default function Loading({width, height, color}) {
    return (
        <div className="text-center flex justify-center py-10 w-full h-full items-center animate-spin">
            <svg style={{margin: "auto", background: "rgb(255, 255, 255)", display: "block", shapeRendering: "auto"}} width={width||"50px"} height={height||"50px"} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke={color||"#050816"} strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">  
                </circle>
            </svg>
        </div>
    )
}