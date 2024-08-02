import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(
  props: PropsWithChildren<{ id: string; disabled?: boolean }>
) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disabled,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "manipulation" }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}
