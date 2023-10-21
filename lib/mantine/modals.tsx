import CreateJournal from "@/components/forms/CreateJournal";
import Settings from "@/components/forms/Settings";
import { modals } from "@mantine/modals";

const openCreateJournalModal = () => {
  modals.open({
    modalId: "create_journal",
    centered: true,
    title: "Create Journal",
    children: <CreateJournal />,
  });
};

const openSettingsModal = () => {
  modals.open({
    modalId: "settings",
    centered: true,
    title: "Settings",
    children: <Settings />,
  });
};

export { openCreateJournalModal, openSettingsModal };
