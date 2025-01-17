import { FindInPageService } from '@affine/core/modules/find-in-page/services/find-in-page';
import { registerAffineCommand, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';

export function useRegisterFindInPageCommands() {
  const findInPage = useService(FindInPageService).findInPage;
  const toggleVisible = useCallback(() => {
    // get the selected text in page
    const selection = window.getSelection();
    const selectedText = selection?.toString();

    findInPage.toggleVisible(selectedText);
  }, [findInPage]);

  useEffect(() => {
    if (!environment.isDesktop) {
      return;
    }
    const unsubs: Array<() => void> = [];
    unsubs.push(
      registerAffineCommand({
        id: `editor:find-in-page`,
        keyBinding: {
          binding: '$mod+f',
        },
        icon: null,
        label: '',
        run() {
          toggleVisible();
        },
      })
    );

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, [toggleVisible]);
}
