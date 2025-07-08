import {
  BaseComponentsCardView, // Importing base components card view
  ComponentsCardViewParameters, // Importing parameters for components card view
  BasicCardView, // Importing basic card view
  IExternalLinkCardAction, // Importing interface for external link card action
  IQuickViewCardAction // Importing interface for quick view card action
} from '@microsoft/sp-adaptive-card-extension-base'; // Importing necessary classes and interfaces from SPFx Adaptive Card Extension base
 
import * as strings from 'HelloWorldAdaptiveCardExtensionStrings'; // Importing localized strings for the extension
import {
  IHelloWorldAdaptiveCardExtensionProps, // Importing interface for extension properties
  IHelloWorldAdaptiveCardExtensionState, // Importing interface for extension state
  QUICK_VIEW_REGISTRY_ID // Importing constant for quick view registry ID from the extension
} from '../HelloWorldAdaptiveCardExtension'; // Importing interfaces and constants from the extension
 
// Class for the CardView, extending BaseComponentsCardView
export class CardView extends BaseComponentsCardView<
  IHelloWorldAdaptiveCardExtensionProps, // Properties interface for the extension
  IHelloWorldAdaptiveCardExtensionState, // State interface for the extension
  ComponentsCardViewParameters // Parameters interface for components card view
> {
 
  // Method to define card view parameters
  public get cardViewParameters(): ComponentsCardViewParameters {
    return BasicCardView({ // Using BasicCardView to create a basic card view
      cardBar: {
        componentName: 'cardBar', // Component name for card bar
        title: this.properties.title // Title of the card bar taken from extension properties
      },
      header: {
        componentName: 'text', // Component name for header (text component)
        text: strings.PrimaryText // Text for the header taken from localized strings
      },
      footer: {
        componentName: 'cardButton', // Component name for footer (card button component)
        title: strings.QuickViewButton, // Title for the card button taken from localized strings
        action: { // Action associated with the card button
          type: 'QuickView', // Type of action (QuickView)
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID // Parameters for the QuickView action, specifying the registry ID for the quick view
          }
        }
      }
    });
  }//end cardViewParameters
 
  // Method to define action when the card is selected
  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView', // Type of action (QuickView)
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID // Parameters for the QuickView action, specifying the registry ID for the quick view
      }
    };
  }//end onCardSelection
}