import { atom, useAtom } from "jotai"
import NDK from "@nostr-dev-kit/ndk"

export const RELAYS = [
  "wss://relay.damus.io",
  "wss://nostr.swiss-enigma.ch",
  "wss://relay.f7z.io",
];

export const relayAtoms = {
  url: atom<string | undefined>(RELAYS[3]),
  status: atom<any>("Pending"),
};

export const ndkAtom = atom<NDK | null>(null);

export const modalAtoms = {
  open: atom(false),
  markdown: atom(""),
};

export const pubKeyAtom = atom<string | undefined>(undefined);

export function useModal() {
  const [isOpen, setIsOpen] = useAtom(modalAtoms.open);
  const [markdown, setMarkdown] = useAtom(modalAtoms.markdown);

  return {
    isOpen,
    setMarkdown,
    setIsOpen,
    markdown,
  };
}

export function useRelay() {
  const [url, setUrl] = useAtom(relayAtoms.url);
  const [status, setStatus] = useAtom(relayAtoms.status);

  return {
    url,
    setUrl,
    status,
    setStatus,
  };
}

export function useNDK() {
  const [ndk, setNDK] = useAtom(ndkAtom);

  return {
    ndk,
    setNDK,
  };
}

export function usePubKey() {
  const [pubKey, setPubKey] = useAtom(pubKeyAtom);

  return {
    pubKey,
    setPubKey,
  };
}
