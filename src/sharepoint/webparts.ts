import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";

export class LimitedWebPartManager extends Queryable {

    /**
     * Gets the set of web part definitions contained by this web part manager
     *
     */
    public get webparts(): WebPartDefinitions {

        return new WebPartDefinitions(this, "webparts");
    }

    /**
     * Exports a webpart definition
     *
     * @param id the GUID id of the definition to export
     */
    public export(id: string): Promise<string> {

        return this.clone(LimitedWebPartManager, "ExportWebPart", true).post({
            body: JSON.stringify({ webPartId: id }),
        });
    }

    /**
     * Imports a webpart
     *
     * @param xml webpart definition which must be valid XML in the .dwp or .webpart format
     */
    public import(xml: string): Promise<any> {

        return this.clone(LimitedWebPartManager, "ImportWebPart", true).post({
            body: JSON.stringify({ webPartXml: xml }),
        });
    }
}

export class WebPartDefinitions extends QueryableCollection {

    /**
     * Gets a web part definition from the collection by id
     *
     * @param id The storage ID of the SPWebPartDefinition to retrieve
     */
    public getById(id: string): WebPartDefinition {

        return new WebPartDefinition(this, `getbyid('${id}')`);
    }

    /**
     * Gets a web part definition from the collection by storage id
     *
     * @param id The WebPart.ID of the SPWebPartDefinition to retrieve
     */
    public getByControlId(id: string): WebPartDefinition {

        return new WebPartDefinition(this, `getByControlId('${id}')`);
    }
}

export class WebPartDefinition extends QueryableInstance {

    /**
     * Gets the webpart information associated with this definition
     */
    public get webpart(): WebPart {

        return new WebPart(this);
    }

    /**
     * Saves changes to the Web Part made using other properties and methods on the SPWebPartDefinition object
     */
    public saveChanges(): Promise<any> {

        return this.clone(WebPartDefinition, "SaveWebPartChanges", true).post();
    }

    /**
     * Moves the Web Part to a different location on a Web Part Page
     *
     * @param zoneId The ID of the Web Part Zone to which to move the Web Part
     * @param zoneIndex A Web Part zone index that specifies the position at which the Web Part is to be moved within the destination Web Part zone
     */
    public moveTo(zoneId: string, zoneIndex: number): Promise<void> {

        return this.clone(WebPartDefinition, `MoveWebPartTo(zoneID='${zoneId}', zoneIndex=${zoneIndex})`, true).post();
    }

    /**
     * Closes the Web Part. If the Web Part is already closed, this method does nothing
     */
    public close(): Promise<void> {

        return this.clone(WebPartDefinition, "CloseWebPart", true).post();
    }

    /**
     * Opens the Web Part. If the Web Part is already closed, this method does nothing
     */
    public open(): Promise<void> {

        return this.clone(WebPartDefinition, "OpenWebPart", true).post();

    }

    /**
     * Removes a webpart from a page, all settings will be lost
     */
    public delete(): Promise<void> {

        return this.clone(WebPartDefinition, "DeleteWebPart", true).post();
    }
}

export class WebPart extends QueryableInstance {

    /**
     * Creates a new instance of the WebPart class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl: string | Queryable, path = "webpart") {
        super(baseUrl, path);
    }
}
