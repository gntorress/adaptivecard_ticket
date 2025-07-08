// Import necessary types and classes from SPFx libraries
import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
 
//import { sp } from "@pnp/sp";
 
// Import custom components for card view and quick view
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HelloWorldPropertyPane } from './HelloWorldPropertyPane'; // Import custom property pane component
 
export interface IOption {
  title: string;
  value: string;
}
 
// Interface defining the properties for the adaptive card extension
export interface IHelloWorldAdaptiveCardExtensionProps {
  title: string; // Title of the extension, used for display purposes
  items: IListItem; // Items property of type IListItem, representing a list item
}
 
// Interface defining the state for the adaptive card extension
export interface IHelloWorldAdaptiveCardExtensionState {
  items: IListItem[]; // Array of items of type IListItem, representing the state of list items
  subTitle: string; // Subtitle string, used to hold a dynamic subtitle
  isSubmitClicked: boolean; // Property for whether or not the submit button has been clicked
}
 
// Constants for card view and quick view registry IDs
const CARD_VIEW_REGISTRY_ID: string = 'HelloWorld_CARD_VIEW'; // Unique ID for the card view
export const QUICK_VIEW_REGISTRY_ID: string = 'HelloWorld_QUICK_VIEW'; // Unique ID for the quick view
 
// Main class for the adaptive card extension, extending the BaseAdaptiveCardExtension class
export default class HelloWorldAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHelloWorldAdaptiveCardExtensionProps, // Properties interface for the extension
  IHelloWorldAdaptiveCardExtensionState // State interface for the extension
> {
  // Private variable to hold the deferred property pane
  private _deferredPropertyPane: HelloWorldPropertyPane;
 
  // Method that initializes the extension, called during the lifecycle of the adaptive card extension
  public onInit(): Promise<void> {
 
    /*sp.setup({
      spfxContext: this.context
    });*/
 
 
    // Setting the initial state of the extension
    this.state = {
      items: [], // Initializing items as an empty array, ready to be populated
      subTitle: "Please fill out the information below", // Initializing subTitle with a default message
      isSubmitClicked: false,
    };
 
    // Registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // Registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
 
    // Returning a resolved promise to indicate successful initialization
    return Promise.resolve();
}
 
  // Method to load property pane resources asynchronously, used for lazy loading
  protected loadPropertyPaneResources(): Promise<void> {
    // Dynamically import the property pane component
    return import(
      /* webpackChunkName: 'HelloWorld-property-pane' */ // Webpack chunk name for lazy loading
      './HelloWorldPropertyPane'
    )
    .then(
      (component) => {
        // Assigning the loaded property pane component to the deferred property pane variable
        this._deferredPropertyPane = new component.HelloWorldPropertyPane();
      }
    );
  }
 
  // Method to render the card view, returns the registry ID of the card view to be displayed
  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID; // Returning the card view registry ID to indicate which card view to render
  }
 
  // Method to get the property pane configuration, used to display and manage the property pane
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration(); // Returning the property pane configuration
  }
 
  // Method to handle actions, such as button clicks in the adaptive card
  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
      const submittedData = action.data;
      const { subTitle } = submittedData;
 
      // Update the state with the submitted message and button text
      this.setState({
        subTitle: subTitle,
        isSubmitClicked: true,
      });
    }
  }
}
 
// Interface defining the structure of a list item
export interface IListItem {
  title: string; // Title of the list item, representing the main title of the item
  description: string; // Description of the list item, providing additional details
  index: number; // Index of the list item, used to identify the position of the item in a list
}