import Piechart from "./pieChart";

const Charts = ({ widgets ,setWidgets}) => {
   
    const deleteWidget = (widgetName, category) => {
        console.log(widgetName);
        console.log(category);
        
        
        setWidgets(prevWidgets => {
            const updatedWidgets = { ...prevWidgets };
            console.log(updatedWidgets);
            console.log(updatedWidgets[category.toLowerCase()]);

            if (updatedWidgets[category.toLowerCase()]) {
               
                console.log(updatedWidgets[category.toLowerCase()]);
                
                updatedWidgets[category.toLowerCase()] = updatedWidgets[category.toLowerCase()].filter(
                    widget => widget.title !== widgetName
                );

            }

            localStorage.setItem('widgets', JSON.stringify(updatedWidgets));
            console.log(updatedWidgets);
            

            return updatedWidgets;
        });
    };


    return (
        <div>
            {widgets && Object.entries(widgets).map(([category, widgetArray]) => (
                <div key={category} className="mb-8">

                    <h2 className="text-xl font-bold mb-4 uppercase mt-2 px-2 mb-4">{category} Dashboard</h2>


                    {widgetArray && widgetArray.length > 0 ? (
                        <div className="flex flex-row w-fit flex-wrap ">

                            {widgetArray.map((widget, index) => (
                                <div key={index} className="relative  p-4 flex p-4 ml-4 mt-4  border rounded-lg">
                                    <h1 className="absolute right-8 cursor-pointer hover:border px-2" onClick={() => deleteWidget(widget.title, widget.category)}>X</h1>
                                    <h1>{widget.title}</h1>
                                    {widget.data.labels.length > 0 && widget.data.values.length > 0 ? (
                                        <Piechart
                                            data={{
                                                labels: widget.data.labels,
                                                values: widget.data.values
                                            }}
                                        />
                                    ) : (
                                        <div className="flex flex-col  items-center justify-center">

                                            <h2 className="mr-8">No Data Available</h2>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-48">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                            </svg>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-1/5 relative p-4 flex items-center flex-col border rounded-lg">

                            <h1>No Data Available</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-48">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Charts;
