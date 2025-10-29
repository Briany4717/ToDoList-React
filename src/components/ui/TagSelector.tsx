import React, { useState } from 'react';
import { Tag } from '../../types';

interface TagSelectorProps {
  selectedTags: Tag[];
  availableTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onCreateTag?: (tag: Tag) => void;
}

const PRESET_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#EAB308', // yellow
  '#84CC16', // lime
  '#22C55E', // green
  '#10B981', // emerald
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#0EA5E9', // sky
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#A855F7', // purple
  '#D946EF', // fuchsia
  '#EC4899', // pink
];

const PRESET_ICONS = [
  { name: 'Sin icono', icon: undefined },
  { name: 'Etiqueta', icon: 'label' },
  { name: 'Trabajo', icon: 'work' },
  { name: 'Hogar', icon: 'home' },
  { name: 'Estrella', icon: 'star' },
  { name: 'Favorito', icon: 'favorite' },
  { name: 'Compras', icon: 'shopping_cart' },
  { name: 'Fitness', icon: 'fitness_center' },
  { name: 'Libro', icon: 'book' },
  { name: 'Música', icon: 'music_note' },
  { name: 'Viaje', icon: 'flight' },
  { name: 'Comida', icon: 'restaurant' },
  { name: 'Urgente', icon: 'priority_high' },
  { name: 'Importante', icon: 'flag' },
  { name: 'Idea', icon: 'lightbulb' },
  { name: 'Recordatorio', icon: 'notifications' },
];

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  availableTags,
  onTagsChange,
  onCreateTag,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(PRESET_COLORS[0]);
  const [newTagIcon, setNewTagIcon] = useState<string | undefined>(undefined);

  const handleToggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id);
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newTagName.trim(),
      color: newTagColor,
      icon: newTagIcon,
    };

    // Notificar al componente padre sobre el nuevo tag
    if (onCreateTag) {
      onCreateTag(newTag);
    }

    // Agregar el tag a la lista de seleccionados
    onTagsChange([...selectedTags, newTag]);

    // Resetear el formulario
    setNewTagName('');
    setNewTagColor(PRESET_COLORS[0]);
    setNewTagIcon(undefined);
    setIsCreating(false);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium'>Tags (opcional)</label>
        <button
          type='button'
          onClick={() => setIsCreating(!isCreating)}
          className='text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors'
        >
          <span className='material-symbols-rounded' style={{ fontSize: '16px' }}>
            {isCreating ? 'close' : 'add'}
          </span>
          {isCreating ? 'Cancelar' : 'Crear tag'}
        </button>
      </div>

      {/* Formulario de creación de tag */}
      {isCreating && (
        <div className='bg-gray-50 rounded-lg p-3 flex flex-col gap-3'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCreateTag();
                }
              }}
              placeholder='Nombre del tag'
              className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all'
              maxLength={20}
              autoFocus
            />
          </div>

          {/* Selector de iconos */}
          <div>
            <label className='text-xs font-medium text-gray-600 mb-1.5 block'>Icono</label>
            <div className='flex flex-wrap gap-1.5 max-h-32 overflow-y-auto'>
              {PRESET_ICONS.map((iconOption) => (
                <button
                  key={iconOption.name}
                  type='button'
                  onClick={() => setNewTagIcon(iconOption.icon)}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all border-2 ${
                    newTagIcon === iconOption.icon
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                  title={iconOption.name}
                  aria-label={iconOption.name}
                >
                  {iconOption.icon ? (
                    <span
                      className='material-symbols-rounded'
                      style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                    >
                      {iconOption.icon}
                    </span>
                  ) : (
                    <span className='text-xs font-bold text-gray-400'>Aa</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de colores */}
          <div>
            <label className='text-xs font-medium text-gray-600 mb-1.5 block'>Color</label>
            <div className='flex flex-wrap gap-2'>
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type='button'
                  onClick={() => setNewTagColor(color)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    newTagColor === color
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Seleccionar color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Vista previa */}
          <div className='flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200'>
            <span className='text-xs font-medium text-gray-600'>Vista previa:</span>
            <span
              className='flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium'
              style={{
                backgroundColor: `${newTagColor}20`,
                borderColor: `${newTagColor}40`,
                color: newTagColor,
                border: '1px solid',
              }}
            >
              {newTagIcon && (
                <span
                  className='material-symbols-rounded'
                  style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}
                >
                  {newTagIcon}
                </span>
              )}
              {newTagName.trim() || 'Nombre del tag'}
            </span>
          </div>

          <button
            type='button'
            onClick={handleCreateTag}
            disabled={!newTagName.trim()}
            className='px-3 py-2 rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white text-sm font-medium transition-all'
          >
            Crear tag
          </button>
        </div>
      )}

      {/* Lista de tags disponibles */}
      {availableTags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {availableTags.map((tag) => {
            const isSelected = selectedTags.some((t) => t.id === tag.id);
            return (
              <button
                key={tag.id}
                type='button'
                onClick={() => handleToggleTag(tag)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-200 border-2
                  ${
                    isSelected
                      ? 'ring-2 ring-offset-1 scale-105'
                      : 'hover:scale-105 border-transparent'
                  }
                `}
                style={{
                  backgroundColor: isSelected ? tag.color : `${tag.color}20`,
                  color: isSelected ? '#FFFFFF' : tag.color,
                  borderColor: isSelected ? tag.color : 'transparent',
                  ['--tw-ring-color' as string]: `${tag.color}40`,
                }}
              >
                {tag.icon ? (
                  <span
                    className='material-symbols-rounded'
                    style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}
                  >
                    {tag.icon}
                  </span>
                ) : null}
                {tag.name}
                {isSelected && (
                  <span
                    className='material-symbols-rounded'
                    style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {availableTags.length === 0 && !isCreating && (
        <p className='text-sm text-gray-500 text-center py-3'>
          No hay tags disponibles. Crea el primero.
        </p>
      )}

      {/* Tags seleccionados */}
      {selectedTags.length > 0 && (
        <div className='flex items-center gap-2 pt-2 border-t border-gray-200'>
          <span className='text-xs text-gray-600 font-medium'>Seleccionados:</span>
          <div className='flex flex-wrap gap-1.5'>
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className='flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium'
                style={{
                  backgroundColor: tag.color,
                  color: '#FFFFFF',
                }}
              >
                {tag.icon && (
                  <span
                    className='material-symbols-rounded'
                    style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}
                  >
                    {tag.icon}
                  </span>
                )}
                {tag.name}
                <button
                  type='button'
                  onClick={() => handleToggleTag(tag)}
                  className='material-symbols-rounded hover:bg-black/10 rounded-full transition-colors'
                  style={{ fontSize: '14px' }}
                  aria-label={`Remover tag ${tag.name}`}
                >
                  close
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
