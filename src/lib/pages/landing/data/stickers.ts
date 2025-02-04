// src/lib/pages/landing/data/stickers.ts

export type StickerConfig = {
  icon: 'docs' | 'drive' | 'figma' | 'keyboard' | 'chat';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: {
    width: string;
    height: string;
  };
  rotation: number;
  animation: {
    duration: string;
    delay: string;
  };
  hasStrike?: boolean;
}

export const stickerConfigs: Record<string, StickerConfig> = {
  keyboard: {
    icon: 'keyboard',
    position: {
      bottom: '28vh',
      right: '12vw'
    },
    size: {
      width: '15vw',
      height: '5vw'
    },
    rotation: 8,
    animation: {
      duration: '5s',
      delay: '1s'
    }
  },
  chat: {
    icon: 'chat',
    position: {
      bottom: '20vh',
      right: '15vw'
    },
    size: {
      width: '20vw',
      height: '6vw'
    },
    rotation: -4,
    animation: {
      duration: '6.5s',
      delay: '0.75s'
    }
  },
  docs: {
    icon: 'docs',
    position: {
      bottom: '26vh',
      left: '3vw'
    },
    size: {
      width: '10vh',
      height: '10vh'
    },
    rotation: 6,
    animation: {
      duration: '6s',
      delay: '0s'
    }
  },
  drive: {
    icon: 'drive',
    position: {
      bottom: '14vh',
      left: '12vh'
    },
    size: {
      width: '12vh',
      height: '12vh'
    },
    rotation: -12,
    animation: {
      duration: '7s',
      delay: '0.5s'
    }
  },
  figma: {
    icon: 'figma',
    position: {
      bottom: '22vh',
      left: '13vw'
    },
    size: {
      width: '11vh',
      height: '11vh'
    },
    rotation: 8,
    animation: {
      duration: '6.2s',
      delay: '0.25s'
    },
    hasStrike: true
  }
}