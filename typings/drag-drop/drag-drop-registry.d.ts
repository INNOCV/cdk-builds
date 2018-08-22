/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Service that keeps track of all the drag item and drop container
 * instances, and manages global event listeners on the `document`.
 * @docs-private
 */
export declare class DragDropRegistry<I, C extends {
    id: string;
}> implements OnDestroy {
    private _ngZone;
    private _document;
    /** Registered drop container instances. */
    private _dropInstances;
    /** Registered drag item instances. */
    private _dragInstances;
    /** Drag item instances that are currently being dragged. */
    private _activeDragInstances;
    /** Keeps track of the event listeners that we've bound to the `document`. */
    private _globalListeners;
    /**
     * Emits the `touchmove` or `mousemove` events that are dispatched
     * while the user is dragging a drag item instance.
     */
    readonly pointerMove: Subject<TouchEvent | MouseEvent>;
    /**
     * Emits the `touchend` or `mouseup` events that are dispatched
     * while the user is dragging a drag item instance.
     */
    readonly pointerUp: Subject<TouchEvent | MouseEvent>;
    constructor(_ngZone: NgZone, _document: any);
    /** Adds a drop container to the registry. */
    registerDropContainer(drop: C): void;
    /** Adds a drag item instance to the registry. */
    registerDragItem(drag: I): void;
    /** Removes a drop container from the registry. */
    removeDropContainer(drop: C): void;
    /** Removes a drag item instance from the registry. */
    removeDragItem(drag: I): void;
    /**
     * Starts the dragging sequence for a drag instance.
     * @param drag Drag instance which is being dragged.
     * @param event Event that initiated the dragging.
     */
    startDragging(drag: I, event: TouchEvent | MouseEvent): void;
    /** Stops dragging a drag item instance. */
    stopDragging(drag: I): void;
    /** Gets whether a drag item instance is currently being dragged. */
    isDragging(drag: I): boolean;
    /** Gets a drop container by its id. */
    getDropContainer(id: string): C | undefined;
    ngOnDestroy(): void;
    /**
     * Listener used to prevent `touchmove` events while the element is being dragged.
     * This gets bound once, ahead of time, because WebKit won't preventDefault on a
     * dynamically-added `touchmove` listener. See https://bugs.webkit.org/show_bug.cgi?id=184250.
     */
    private _preventScrollListener;
    /** Clears out the global event listeners from the `document`. */
    private _clearGlobalListeners();
}