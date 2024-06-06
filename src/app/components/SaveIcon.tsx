import { SpinnerIcon, SuccessIcon } from '@ui-kit';
import React from 'react';

const SaveIcon: React.FC<{
  isSaving: boolean;
}> = ({ isSaving }) => {
  const content = isSaving ? (
    <>
      <SpinnerIcon /> <span className="ml-2">Saving...</span>
    </>
  ) : (
    <>
      <SuccessIcon /> <span className="ml-2">Saved</span>
    </>
  );
  return (
    <div className="p-2 w-44">
      <div className="flex items-center">{content}</div>
    </div>
  );
};
export default SaveIcon;
