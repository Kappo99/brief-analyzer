import React, { useState } from 'react';
import { Mail, Copy, Check, Edit3 } from 'lucide-react';

interface EmailTemplateProps {
  template: string;
}

export default function EmailTemplate({ template }: EmailTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState(template);

  const copyTemplate = () => {
    navigator.clipboard.writeText(editedTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Mail className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Template Email di Risposta</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Annulla' : 'Modifica'}
          </button>
          <button
            onClick={copyTemplate}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiato!' : 'Copia'}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Template personalizzato basato sull'analisi del brief. Puoi modificarlo secondo le tue esigenze.
      </p>

      <div className="bg-gray-50 rounded-xl p-4">
        {isEditing ? (
          <div>
            <textarea
              value={editedTemplate}
              onChange={(e) => setEditedTemplate(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Salva
              </button>
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm leading-relaxed">
            {editedTemplate}
          </pre>
        )}
      </div>
    </div>
  );
}