type VehicleModels = "ascent" | "brz" | "crosstrek" | "forester" | "impreza" | "legacy" | "outback" | "solterra" | "wrx"
type VehicleYearRange ="all" | "2015" | "2016" | "2017" | "2018" | "2019" | "2020" | "2021" | "2022" | "2023" | "2024" | "2025" | "2026"

type VehicleData = {
    [key in VehicleModels]?: | {
        [key in VehicleYearRange]?: {
            eaf?: string,
            caf?: string,
            wipers?: {
                driver: string,
                pass: string,
                rear?: string
            }
        }
    }
}


    const vehicleData: VehicleData = {
        ascent: {
            all: {
                eaf: "16546AA16A",
                caf: "72880FL00A",
                wipers: {
                    driver: "SOA591U726",
                    pass: "SOA591U720",
                    rear: "SOA591R614"
                }
            }
        },
        brz: {},
        crosstrek: {
            "2022": {
                eaf: "16546AA210",
                caf: "72880FL00A",
                wipers: {
                    driver: "SOA591B726",
                    pass: "SOA591B716",
                    rear: "SOA591R614"
                }
            }
        },
        forester: {
            "2018": {
                eaf: "16546AA12A",
                caf: "72880FG000"
            },
            "2019": {
                eaf: "16546AA16A",
                caf: "72880FL000",
                wipers: {
                    driver: "SOA591B726",
                    pass: "SOA591B717",
                    rear: "SOA591R614"
                }
            }
        }
    }

    function generateNode(label: string, value: string): HTMLDivElement {

        // Create new elements
        const newNode = document.createElement("div")
        const labelSpan = document.createElement("span")
        const valueSpan = document.createElement("span")

        // Assign styling
        Object.assign(newNode.style, {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px"
        })
        Object.assign(valueSpan.style, {
            fontWeight: 900,
            fontSize: "large",
            color: "black"
        })

        // Assign text values
        labelSpan.textContent = label
        valueSpan.textContent = value

        // Build element
        newNode.appendChild(labelSpan)
        newNode.appendChild(valueSpan)

        return newNode
    }

function generateQuickList(node: HTMLElement, vehicleString: string) {
    const [year, _, model] = vehicleString.split(" ")

    if (model === undefined || year === undefined) return null

    const eafAll = vehicleData[model.toLowerCase() as VehicleModels]?.all?.eaf
    const eafByYear = vehicleData[model.toLowerCase() as VehicleModels]?.[year as VehicleYearRange]?.eaf

    const cafAll = vehicleData[model.toLowerCase() as VehicleModels]?.all?.caf
    const cafByYear = vehicleData[model.toLowerCase() as VehicleModels]?.[year as VehicleYearRange]?.caf

    const wipersAll = vehicleData[model.toLowerCase() as VehicleModels]?.all?.wipers
    const wipersByYear = vehicleData[model.toLowerCase() as VehicleModels]?.[year as VehicleYearRange]?.wipers

    const eafString = eafAll ?? eafByYear ?? "No Data"
    const cafString = cafAll ?? cafByYear ?? "No Data"
    const driverWiperString = wipersAll?.driver ?? wipersByYear?.driver ?? "No Data"
    const passWiperString = wipersAll?.pass ?? wipersByYear?.pass ?? "No Data"
    const rearWiperString = wipersAll?.rear ?? wipersByYear?.rear ?? "No Data"

    const eafNode = generateNode("Engine Air Filter:", eafString)
    const cafNode = generateNode("Cabin Air Filter:", cafString)
    const wiperNode = generateCompositeNode("Wiper Blades:", driverWiperString, passWiperString, rearWiperString)

    node.appendChild(eafNode)
    node.appendChild(cafNode)
    node.appendChild(wiperNode)
}

function displayVehicleData(node: Element) {
    // Main Container
    const container = document.createElement("div");
    Object.assign(container.style, {
        position: "fixed",
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
        zIndex: 9999,
        background: "white",
        border: "solid #3F83AA 2px",
        borderRadius: "5px 5px 0 0",
    })
    // Header
    const vehicleHeader = document.createElement("div")
    Object.assign(vehicleHeader.style, {
        background: "#3F83AA",
        height: "40px",
        color: "white",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    })
    // Header Text
    const vehicleHeaderText = document.createElement("span")
    vehicleHeaderText.style.textAlign = "center"
    vehicleHeaderText.textContent = node.textContent.toUpperCase()

    // Data Container
    const dataContainer = document.createElement("div")
    Object.assign(dataContainer.style, {
        padding: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"

    })

    vehicleHeader.appendChild(vehicleHeaderText)
    container.appendChild(vehicleHeader)
    generateQuickList(dataContainer, node.textContent)
    container.appendChild(dataContainer)



    const body = document.body
    body.insertAdjacentElement("afterbegin", container)

}

const vinFieldContainer = document.getElementById("infoVINNumber");
const vehicleFieldContainer = document.getElementById("infoVehicle");

// for (const node of vinFieldContainer.childNodes) {
//     if (node instanceof Element && node.tagName === "SPAN") {

//     }
// }

if (vehicleFieldContainer) {
    for (const node of vehicleFieldContainer.childNodes) {
    if (node instanceof Element && node.tagName === "SPAN") {
        displayVehicleData(node)
    }
}
}

function generateCompositeNode(label: string, driverWiperString: string, passWiperString: string, rearWiperString: string) {
    const newNode = document.createElement("div")
    const containerNode = document.createElement("div");
    const labelSpan = document.createElement("span");

    Object.assign(newNode.style, {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "8px",
    })
    Object.assign(containerNode.style, {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        paddingLeft: "16px"
    })
    
    labelSpan.textContent = label

    newNode.appendChild(labelSpan)

    containerNode.appendChild(generateNode("Driver:", driverWiperString))
    containerNode.appendChild(generateNode("Passenger:", passWiperString))
    containerNode.appendChild(generateNode("Rear:", rearWiperString))

    newNode.appendChild(containerNode)

    return newNode
}
