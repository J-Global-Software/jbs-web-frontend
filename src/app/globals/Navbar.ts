// src/payload/globals/Navbar.ts

import { GlobalConfig } from "payload";

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'group',
      fields: [
        { name: 'why', type: 'text', localized: true, defaultValue: 'Why JBS' },
        { name: 'programs', type: 'text', localized: true, defaultValue: 'Programs' },
        { name: 'pricing', type: 'text', localized: true, defaultValue: 'Pricing' },
        { name: 'instructors', type: 'text', localized: true, defaultValue: 'Instructors' },
        { name: 'freeTrial', type: 'text', localized: true, defaultValue: 'Free Trial' },
        { name: 'login', type: 'text', localized: true, defaultValue: 'Login' },
      ],
    },
  ],
};