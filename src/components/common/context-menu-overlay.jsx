import { ContextMenu } from 'primereact/contextmenu';

export const ContextMenuOverlay = ({ cmRef, handleSetFront, handleSetBack }) => {
  const items = [
    { label: 'Llevar al frente', icon: 'pi pi-copy', command : () => handleSetFront() },
    { label: 'Llevar atrás', icon: 'pi pi-file-edit', command : () => handleSetBack() }
  ];

  return (
    <ContextMenu model={items} ref={cmRef} breakpoint="767px" />
  )
}
