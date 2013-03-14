// Vars
var originalColorMap = new Object();
var definedColor = '#ff00aa';

// Add listener to add elements in dom
recurseDomChildren(document.body, true);

function recurseDomChildren(start, output) {
	var nodes;
	if (start.childNodes) {
		nodes = start.childNodes;
		loopNodeChildren(nodes, output);
	}
}

function loopNodeChildren(nodes, output) {
	var node;
	for ( var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if (output) {
			outputNode(node);
		}
		if (node.childNodes) {
			recurseDomChildren(node, output);
		}
	}
}

function outputNode(node) {
	var whitespace = /^\s+$/g;
	if (node.nodeType === 1) {
		//console.log("element: " + node.tagName);

		node.addEventListener("mouseover", function() {
			originalColorMap[node] = node.style.backgroundColor;
			node.style.backgroundColor = definedColor;
			
			// Tady se musi testovat jestli nejaky jeho parent nema zmenenou barvu!!!! a pokud ano, tak odbarvit!!!
			var parentNode = node.parentNode;
			if (originalColorMap.hasOwnProperty(parentNode)) {			
				console.log(node.tagName + ": Predek ma zmenenu barvu: " + parentNode.tagName);
				parentNode.style.backgroundColor = originalColorMap[parentNode];
			}
		}, false);
		
		node.addEventListener("mouseout", function() {
			node.style.backgroundColor = originalColorMap[node];
			delete originalColorMap[node];
			
			// Pokud se to predtim odbarvilo, tak se to musi zpetne obarvit
			var parentNode = node.parentNode;
			if (originalColorMap.hasOwnProperty(parentNode) && originalColorMap[parentNode] != definedColor) {			
				console.log(node.tagName + ": Musime zmenit barvu predka zpet: " + parentNode.tagName);
				originalColorMap[parentNode] = parentNode.style.backgroundColor;
				parentNode.style.backgroundColor = definedColor;
			}
		}, false);
	}
}
