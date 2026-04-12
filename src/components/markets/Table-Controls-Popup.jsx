
import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { DEFAULT_VISIBLE_IDS, LABEL_COLS, STOCK_COLS } from '../../utils/placeholder-data';

const initLabelItems = (vis) => LABEL_COLS.map(c => ({ ...c, selected: c.pinned || vis.has(c.id) }));
const initStockItems = (vis) => STOCK_COLS.map(c => ({ ...c, selected: vis.has(c.id) }));

const CheckboxIcon = ({ checked, indeterminate, disabled, readonly, onChange }) => {
    const checkmark = (
        <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
            <path d="M1 5l3 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    if (disabled) {
        return <div className="w-4 h-4 rounded border border-gray-300 bg-white flex-shrink-0" />;
    }

    if (readonly) {
        return (
            <div className="w-4 h-4 rounded border border-[#724A9A] bg-[#724A9A] flex items-center justify-center flex-shrink-0">
                {checkmark}
            </div>
        );
    }

    return (
        <button
            onClick={(e) => { e.stopPropagation(); onChange && onChange(); }}
            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${checked || indeterminate ? 'bg-[#724A9A] border-[#724A9A]' : 'border-gray-300 bg-white'
                }`}
        >
            {checked && !indeterminate && checkmark}
            {indeterminate && <div className="w-2 h-0.5 bg-white rounded" />}
        </button>
    );
};

const TableControls = ({ tabName = 'Tops', initialVisible, onClose, onApply }) => {
    const defaultVis = new Set(DEFAULT_VISIBLE_IDS);
    const vis = initialVisible ?? defaultVis;

    const [labelExpanded, setLabelExpanded] = useState(true);
    const [stockExpanded, setStockExpanded] = useState(true);
    const [labelItems, setLabelItems] = useState(() => initLabelItems(vis));
    const [stockItems, setStockItems] = useState(() => initStockItems(vis));

    const toggleLabelItem = (id) =>
        setLabelItems(items => items.map(i => (i.id === id && !i.pinned ? { ...i, selected: !i.selected } : i)));

    const toggleStockItem = (id) =>
        setStockItems(items => items.map(i => (i.id === id ? { ...i, selected: !i.selected } : i)));

    const nonPinnedLabel = labelItems.filter(i => !i.pinned);
    const labelAllSelected = nonPinnedLabel.every(i => i.selected);
    const labelSomeSelected = nonPinnedLabel.some(i => i.selected);
    const labelIndeterminate = labelSomeSelected && !labelAllSelected;
    const toggleAllLabel = () =>
        setLabelItems(items => items.map(i => (i.pinned ? i : { ...i, selected: !labelAllSelected })));

    const stockAllSelected = stockItems.every(i => i.selected);
    const stockSomeSelected = stockItems.some(i => i.selected);
    const stockIndeterminate = stockSomeSelected && !stockAllSelected;
    const toggleAllStock = () =>
        setStockItems(items => items.map(i => ({ ...i, selected: !stockAllSelected })));

    const selectedItems = [
        ...labelItems.filter(i => i.pinned || i.selected).map(i => ({ ...i, group: 'label' })),
        ...stockItems.filter(i => i.selected).map(i => ({ ...i, group: 'stock' })),
    ];

    const removeSelectedItem = (item) => {
        if (item.pinned) return;
        if (item.group === 'label') toggleLabelItem(item.id);
        else toggleStockItem(item.id);
    };

    const resetToDefaults = () => {
        const dv = new Set(DEFAULT_VISIBLE_IDS);
        setLabelItems(initLabelItems(dv));
        setStockItems(initStockItems(dv));
    };

    const handleDone = () => {
        const newVisible = new Set();
        labelItems.forEach(i => { if (i.pinned || i.selected) newVisible.add(i.id); });
        stockItems.forEach(i => { if (i.selected) newVisible.add(i.id); });
        if (onApply) onApply(newVisible);
        if (onClose) onClose();
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[80vh] flex flex-col border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-800">{tabName} Items</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={16} />
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left — Available Items */}
                <div className="w-1/2 border-r border-gray-200 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-b border-gray-100">Available Items</div>
                    <div className="flex-1 overflow-y-auto p-2 hide-scrollbar">
                        {/* Label Group */}
                        <div className="mb-1">
                            <div className="flex border border-[#E0E0E4] rounded items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-50" onClick={toggleAllLabel}>
                                <CheckboxIcon checked={labelAllSelected} indeterminate={labelIndeterminate} onChange={toggleAllLabel} />
                                <span className="text-xs font-medium flex-1 text-gray-800">Label</span>
                                <button onClick={e => { e.stopPropagation(); setLabelExpanded(v => !v); }} className="text-gray-400 hover:text-gray-600">
                                    {labelExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>
                            <div className={`overflow-hidden transition-all duration-250 ease-out ${labelExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="ml-6 space-y-0.5 pt-0.5">
                                    {labelItems.map(item => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 ${item.pinned ? 'cursor-default' : 'cursor-pointer'}`}
                                            onClick={() => !item.pinned && toggleLabelItem(item.id)}
                                        >
                                            <CheckboxIcon checked={item.selected} readonly={item.pinned} onChange={() => toggleLabelItem(item.id)} />
                                            <span className="text-xs text-gray-700">{item.label}</span>
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stock Group */}
                        <div>
                            <div className="flex border border-[#E0E0E4] rounded items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-50" onClick={toggleAllStock}>
                                <CheckboxIcon checked={stockAllSelected} indeterminate={stockIndeterminate} onChange={toggleAllStock} />
                                <span className="text-xs font-medium flex-1 text-gray-800">Stock</span>
                                <button onClick={e => { e.stopPropagation(); setStockExpanded(v => !v); }} className="text-gray-400 hover:text-gray-600">
                                    {stockExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>
                            <div className={`overflow-hidden transition-all duration-250 ease-out ${stockExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="ml-6 space-y-0.5 pt-0.5">
                                    {stockItems.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer"
                                            onClick={() => toggleStockItem(item.id)}
                                        >
                                            <CheckboxIcon checked={item.selected} onChange={() => toggleStockItem(item.id)} />
                                            <span className="text-xs text-gray-700">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Selected Items */}
                <div className="w-1/2 flex flex-col overflow-hidden">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-b border-gray-100">Selected Items</div>
                    <div className="flex-1 overflow-y-auto p-2 hide-scrollbar space-y-0.5">
                        {selectedItems.map(item => (
                            <div
                                key={item.id}
                                className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 ${item.pinned ? 'cursor-default' : 'cursor-pointer'}`}
                                onClick={() => removeSelectedItem(item)}
                            >
                                <CheckboxIcon checked readonly={item.pinned} onChange={() => removeSelectedItem(item)} />
                                <span className="text-xs text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <button onClick={resetToDefaults} className="px-4 py-2 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors">
                    Reset to Defaults
                </button>
                <button onClick={handleDone} className="px-6 py-2 text-xs bg-[#724A9A] text-white rounded hover:bg-[#5d3a7e] transition-colors">
                    Done
                </button>
            </div>
        </div>
    );
};

export default TableControls;