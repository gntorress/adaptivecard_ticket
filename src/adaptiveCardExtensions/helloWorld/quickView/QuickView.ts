import * as strings from 'HelloWorldAdaptiveCardExtensionStrings'; // Importing localized strings for the extension
import {
  IHelloWorldAdaptiveCardExtensionProps, // Importing interface for extension properties
  IHelloWorldAdaptiveCardExtensionState, // Importing interface for extension state
} from '../HelloWorldAdaptiveCardExtension'; // Importing interfaces from the extension
import { IListItem } from "../HelloWorldAdaptiveCardExtension"; // Importing interface for list items
import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base'; // Importing necessary classes and interfaces from SPFx Adaptive Card Extension base
//import { addItemToList } from '../services/SPServices';

 
// Interface defining the data structure for the QuickView
export interface IQuickViewData {
  items: IListItem[]; // Array of list items
  subTitle: string; // Subtitle string
  title: string; // Title string
}
 
// Class for the QuickView, extending BaseAdaptiveCardQuickView
export class QuickView extends BaseAdaptiveCardQuickView<
  IHelloWorldAdaptiveCardExtensionProps, // Properties interface for the extension
  IHelloWorldAdaptiveCardExtensionState, // State interface for the extension
  IQuickViewData // Data interface for the QuickView
> {
  // Method to handle actions triggered in the QuickView
  public onAction(action: IActionArguments): void {
    if (action.type === 'Submit') {
      if (action.data.action === 'newTicket') {
        // Reset the state to start the process over
        this.setState({
          subTitle: "Please fill out the information below",
          isSubmitClicked: false,
        });
      } else {
        // Handle the submit action
        this.setState({
          subTitle: "Ticket submitted",
          isSubmitClicked: true
        });
      }
    }
  }
 
 
  // Method to get the data for the QuickView
  public get data(): IQuickViewData {
    return {
      items: this.state.items, // Including items from the extension state
      subTitle: this.state.subTitle, // Subtitle from the extension state
      title: strings.Title, // Title from localized strings
    };
  }
 
  // Method to get the adaptive card template for the QuickView
  public get template(): ISPFxAdaptiveCard {
    if (this.state.isSubmitClicked) {
      // Return a blank template if the subtitle is "Ticket submitted"
      return require('./template/QuickViewBlankTemplate.json');
    } else {
      // Return the regular template
      return require('./template/QuickViewTemplate.json');
    }
  }
}