🎴 Adaptive Card Extension: HelloWorld
This is a SharePoint Framework (SPFx) Adaptive Card Extension (ACE) that presents a simple card UI with a dynamic form, using card view, quick view, and a configurable property pane.

🛠️ This was a practice project based on an earlier solution to a ticket submission system. It was built to explore the potential of Adaptive Cards in SharePoint for interactive form collection and modular design.

📁 Project Structure

src/
├── HelloWorldAdaptiveCardExtension.ts     # Main ACE logic and lifecycle
├── HelloWorldPropertyPane.ts              # Custom property pane UI
├── cardView/
│   └── CardView.ts                        # Card view component
├── quickView/
│   └── QuickView.ts                       # Quick view component

🚀 Features
Adaptive Card UI that toggles between card view and quick view

Custom Property Pane for user-defined configuration

Dynamic form submission handling and state updates

Modular design with strong TypeScript interfaces

Lazy loading for improved performance

🛠️ Setup
Clone the Repo

git clone https://github.com/gntorress/adaptivecard_ticket
Install dependencies

npm install
Build the project

gulp build
Preview in Workbench

gulp serve
🧠 Core Concepts
onInit()
Initializes the extension with default state, registers the CardView and QuickView.

onAction()
Handles the submit button click on the quick view, updating subtitle and submission state.

loadPropertyPaneResources()
Dynamically loads the property pane for performance optimization.

🧩 Interfaces
IListItem

interface IListItem {
  title: string;
  description: string;
  index: number;
}
IHelloWorldAdaptiveCardExtensionProps

interface IHelloWorldAdaptiveCardExtensionProps {
  title: string;
  items: IListItem;
}
IHelloWorldAdaptiveCardExtensionState

interface IHelloWorldAdaptiveCardExtensionState {
  items: IListItem[];
  subTitle: string;
  isSubmitClicked: boolean;
}
