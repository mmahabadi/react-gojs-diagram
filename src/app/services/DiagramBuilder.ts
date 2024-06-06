import * as go from 'gojs';

export class DiagramBuilder {
  private diagram: go.Diagram;

  constructor() {
    this.diagram = new go.Diagram({
      'undoManager.isEnabled': true,
      'resizingTool.isEnabled': true,
      'clickCreatingTool.archetypeNodeData': {
        text: 'new node',
        color: 'lightblue',
        fontSize: 12,
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: 'key',
      }),
    });
  }

  public buildNodeTemplate() {
    this.diagram.nodeTemplate = new go.Node('Auto', {
      resizable: true,
      resizeObjectName: 'SHAPE',
      contextMenu: this.nodeContextMenu(),
    }).add(
      new go.Shape('Circle', {
        name: 'SHAPE',
        fill: 'white',
        strokeWidth: 0,
        width: 150,
        height: 150,
      }).bind('fill', 'color'),
      new go.TextBlock({
        margin: 0,
        editable: false,
        font: 'Italic small-caps bold 12px Georgia, Serif',
      })
        .bindTwoWay('text')
        .bind(
          'font',
          'fontSize',
          (s) => `Italic small-caps bold ${s}px Georgia, Serif`
        )
    );
    return this;
  }

  public buildLinkTemplate() {
    this.diagram.linkTemplate = new go.Link({
      curve: go.Curve.Bezier,
      relinkableFrom: true,
      relinkableTo: true,
      contextMenu: this.linkContextMenu(),
      reshapable: true,
      // linkShifting: true,
    }).add(
      new go.Shape({ strokeWidth: 2 }),
      new go.Shape({ toArrow: 'Standard', strokeWidth: 4 }),
      new go.Panel('Auto').add(
        new go.Shape('RoundedRectangle', { fill: 'lightgray' }),
        new go.TextBlock({ margin: 5 })
          .bind('text')
          .bind(
            'font',
            'fontSize',
            (s) => `Italic small-caps bold ${s}px Georgia, Serif`
          )
      )
    );
    return this;
  }

  public generateDiagram() {
    return this.diagram;
  }

  private nodeContextMenu(): go.Adornment {
    return go.GraphObject.build('ContextMenu').attach(
      go.GraphObject.build('ContextMenuButton', {
        click: (e: go.InputEvent, thisObj: go.GraphObject) =>
          this.changeElementFontSize(e, thisObj, 1 * 2, 'double font size'), 
        'ButtonBorder.fill': 'white',
        _buttonFillOver: 'skyblue',
      }).attach(new go.TextBlock('Double Font Size'))
    ) as go.Adornment;
  }

  private linkContextMenu(): go.Adornment {
    return go.GraphObject.build('ContextMenu').attach(
      go.GraphObject.build('ContextMenuButton', {
        click: (e: go.InputEvent, thisObj: go.GraphObject) =>
          this.changeElementFontSize(e, thisObj, 1 / 2, 'Halve font size'),
        'ButtonBorder.fill': 'white',
        _buttonFillOver: 'skyblue',
      }).attach(new go.TextBlock('Halve Font Size'))
    ) as go.Adornment;
  }

  private changeElementFontSize(
    e: go.InputEvent,
    thisObj: go.GraphObject,
    operation: number,
    description: string
  ) {
    this.diagram.commit((d: go.Diagram) => {
      // get the context menu that holds the button that was clicked
      const contextmenu = thisObj.part;
      // get the node data to which the Node is data bound
      const nodedata = contextmenu?.data;
      // compute the next color for the node
      const newSize = parseFloat(nodedata.fontSize) * operation;
      // this evaluates data Bindings and records changes in the UndoManager
      d.model.set(nodedata, 'fontSize', newSize);
    }, description);
  }
}
