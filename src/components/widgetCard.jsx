const WidgetCard = ({title}) => {
    return (
        <div className="flex gap-4 border items-center w-full p-2">
            <input type="checkbox" defaultChecked="true" className="w-4 h-4" />
            <p>{title}</p>
        </div>   
    )
}

export default WidgetCard;