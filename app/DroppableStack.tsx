import React, { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: PropsWithChildren<{ id: string }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
    height: "fit-content",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
