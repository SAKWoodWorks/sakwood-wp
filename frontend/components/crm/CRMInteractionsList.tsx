'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, User, FileText, Calendar } from 'lucide-react';
import { addCRMNote, getInteractionTypeLabel } from '@/lib/services/crmService';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Interaction } from '@/lib/types';

interface CRMInteractionsListProps {
  interactions: Interaction[];
  userId?: number;
  labels: {
    title: string;
    no_results: string;
    add_note: string;
    note_placeholder: string;
    send: string;
    call: string;
    email: string;
    line: string;
    visit: string;
    note: string;
    inbound: string;
    outbound: string;
  };
  onUpdate?: () => void;
  locale?: string;
}

export function CRMInteractionsList({
  interactions,
  userId,
  labels,
  onUpdate,
  locale = 'th',
}: CRMInteractionsListProps) {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const result = await addCRMNote(noteText, userId);

    setIsSubmitting(false);
    setShowNoteForm(false);
    setNoteText('');

    if (result.success) {
      setSubmitStatus('success');
      onUpdate?.();

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'email':
        return Mail;
      case 'line':
        return MessageCircle;
      case 'visit':
        return User;
      case 'note':
      default:
        return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          {labels.title}
        </h2>
        <Button
          onClick={() => setShowNoteForm(!showNoteForm)}
          variant="outline"
          size="sm"
        >
          + {labels.add_note}
        </Button>
      </div>

      {/* Note Form */}
      {showNoteForm && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <form onSubmit={handleSubmitNote} className="space-y-4">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={labels.note_placeholder}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              required
            />
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || !noteText.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Sending...' : labels.send}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setShowNoteForm(false);
                  setNoteText('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactions List */}
      <div className="divide-y divide-gray-200">
        {interactions && interactions.length > 0 ? (
          interactions.map((interaction) => {
            const Icon = getInteractionIcon(interaction.interactionType);
            const typeLabel = getInteractionTypeLabel(interaction.interactionType, locale);

            return (
              <div key={interaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        {typeLabel}
                      </span>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded',
                        interaction.direction === 'inbound'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      )}>
                        {interaction.direction === 'inbound' ? labels.inbound : labels.outbound}
                      </span>
                    </div>

                    {interaction.subject && (
                      <h4 className="font-medium text-gray-900 mb-1">
                        {interaction.subject}
                      </h4>
                    )}

                    {interaction.message && (
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {interaction.message}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(interaction.createdAt)}
                      {interaction.createdBy && (
                        <>
                          <span>•</span>
                          <span>{interaction.createdBy}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-gray-500">
            {labels.no_results}
          </div>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="m-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          Note added successfully
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="m-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          Failed to add note
        </div>
      )}
    </div>
  );
}
