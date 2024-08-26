import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import * as Tabs from '@radix-ui/react-tabs';
import WidgetCard from "./widgetCard";
import Charts from "./charts";

const Widgets = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [widgets, setWidgets] = useState({
        cspm: [],
        cwpp: [],
        image: [],
        ticket: [],
    });
    const [widgetName, setWidgetName] = useState("");
    // const [widgetText, setWidgetText] = useState("");
    const [currentTab, setCurrentTab] = useState("CSPM");

    const categories = ["CSPM", "CWPP", "Image", "Ticket"]



    const handleAddWidget = () => {

        if (widgetName === "") return;

        const newWidget = {
            title: widgetName,
            category: currentTab,
            data: {
                labels: [],
                values: []
            }
        };

        setWidgets(prevWidgets => {
            const updatedWidgets = {
                ...prevWidgets,
                [currentTab.toLowerCase()]: [...prevWidgets[currentTab.toLowerCase()], newWidget]
            };

            localStorage.setItem('widgets', JSON.stringify(updatedWidgets));
            setWidgetName("");
            return updatedWidgets;
        });




    };

    console.log(widgetName);




    const fetchWidgets = async () => {
        const storedWidgets = localStorage.getItem('widgets');
        console.log(storedWidgets);


        if (storedWidgets) {
            setWidgets(JSON.parse(storedWidgets));
        } else {
            try {
                const response = await fetch("../../public/data.json");

                const data = await response.json();
                console.log("data", data);


                const categorizedWidgets = {
                    cspm: [],
                    cwpp: [],
                    image: [],
                    ticket: [],
                };

                Object.values(data).forEach(item => {
                    switch (item.category) {
                        case "CSPM":
                            categorizedWidgets.cspm.push(item);
                            break;
                        case "CWPP":
                            categorizedWidgets.cwpp.push(item);
                            break;
                        case "Ticket":
                            categorizedWidgets.ticket.push(item);
                            break;
                        case "Image":
                            categorizedWidgets.image.push(item);
                            break;
                        default:
                            break;
                    }
                });

                setWidgets(categorizedWidgets);
                console.log(categorizedWidgets);

                localStorage.setItem('widgets', JSON.stringify(categorizedWidgets));
            } catch (error) {
                console.log("Error while fetching widgets", error);
            }
        }
    };

    useEffect(() => {
        fetchWidgets();
    }, []);

    console.log(currentTab);

    return (
        <div className="m-6">
            <div className="flex items-center justify-between">
                <h1 className="font-bold">CNAPP Dashboard</h1>
                <button
                    className="bg-white text-[#999faa] border p-2 rounded-lg mr-8 border-[#e6ebef]"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    Add Widget +
                </button>
            </div>

            <div>
                <Charts widgets={widgets} setWidgets={setWidgets} />
            </div>


            <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DialogContent className="fixed bottom-0 right-0 w-full max-w-md h-full p-4 bg-white rounded-t-[10px] shadow-lg z-50 flex flex-col" aria-describedby="widget categories">
                    <div className="flex flex-col flex-grow overflow-auto">
                        <div className="flex justify-between items-center bg-[#14147d] text-white p-2 mb-4">
                            <h1>Add widget</h1>
                            <h1 onClick={() => setIsDrawerOpen(false)} className="cursor-pointer">X</h1>
                        </div>
                        <p className="mb-4">Personalize your Dashboard by adding the following widget</p>

                        <Tabs.Root defaultValue="CSPM" className="w-full" onValueChange={(value) => { setCurrentTab(value); }}>
                            <Tabs.List className="flex border-b border-gray-300 mb-4">
                                {categories && categories.map((item, index) => (
                                    <Tabs.Trigger
                                        key={index}
                                        value={item}
                                        className="flex-1 p-2 text-center border-b-2 border-transparent hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-indigo-500 data-[state=active]:border-indigo-500"
                                    >
                                        {item}
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {widgets && Object.keys(widgets).map((category) => (
                                <Tabs.Content key={category} value={category.toUpperCase()} className="p-4">
                                    <div className="flex flex-col gap-4">
                                        {widgets[category].map((widget) => (
                                            <div key={widget.title} className="flex flex-col items-center gap-4">
                                                <WidgetCard title={widget.title} />
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Content>
                            ))}
                        </Tabs.Root>

                        <div className="flex flex-col gap-4 mx-4">
                            <input
                                type="text"
                                placeholder="Enter Widget Name"
                                className="border p-2 rounded-lg w-full"
                                onChange={(e) => setWidgetName(e.target.value)}
                            />
                            {/* <input
                                type="text"
                                placeholder="Enter Widget Text"
                                className="border p-2 rounded-lg"
                                onChange={(e) => setWidgetText(e.target.value)}
                            /> */}
                        </div>


                    </div>

                    <div className="flex justify-end gap-4 mt-4 text-[#868ea2]">
                        <button className="border px-4 py-2 border-[#858aa0] hover:bg-[#0f1941] rounded-lg"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="border px-4 py-2 rounded-lg border-[#858aa0] hover:bg-[#0f1941]"
                            onClick={handleAddWidget}
                        >Confirm
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Widgets;





