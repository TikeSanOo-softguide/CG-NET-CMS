export type Speed = 20 | 50 | 100 | 150;

export type Package = {
  id: string;
  speed: Speed;
  duration: string;
};

export type NetworkPackage = {
  name: string;
  packages: Package[];
};

const networkPackages = {
  "mm-broadband": {
    name: "Myanmar Network",
    packages: [
      { id: "basic", speed: 20, duration: "1 Month" },
      { id: "standard", speed: 50, duration: "1 Month" },
      { id: "advanced", speed: 100, duration: "1 Month" },
      { id: "flagship", speed: 150, duration: "1 Month" },
    ],
  },

  "cg-broadband": {
    name: "CG Network",
    packages: [
      { id: "standard", speed: 50, duration: "1 Month" },
      { id: "advanced", speed: 100, duration: "1 Month" },
    ],
  },

  "cg-net-broadband": {
    name: "CG-NET Network",
    packages: [
      { id: "basic", speed: 20, duration: "1 Month" },
    ],
  },
} satisfies Record<string, NetworkPackage>;

export default networkPackages;