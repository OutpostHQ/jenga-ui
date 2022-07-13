import { PrismCode } from '../src/PrismCode';
import { baseProps } from '../../../stories/lists/baseProps';

export default {
  title: 'Content/PrismCode',
  component: PrismCode,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const Template = ({ ...args }) => <PrismCode {...args} />;

export const OneLine = Template.bind({});
OneLine.args = {
  code: '$ npm install -g jengajs-cli',
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  code: '$ npm install -g jengajs-cli\n$ jengajs deploy',
};

export const JavascriptSyntax = Template.bind({});
JavascriptSyntax.args = {
  language: 'javascript',
  code: `jenga('LineItems', {
  sql: \`SELECT * FROM public.line_items\`,
  joins: {
    Products: {
      sql: \`\${JENGA}.product_id = \${Products}.id\`,
      relationship: \`belongsTo\`
    },
    Orders: {
      sql: \`\${JENGA}.order_id = \${Orders}.id\`,
      relationship: \`belongsTo\`
    }
  },
  measures: {
    count: {
      type: \`count\`,
      drillMembers: [id, createdAt]
    },
    price: {
      sql: \`price\`,
      type: \`sum\`
    },
    quantity: {
      sql: \`quantity\`,
      type: \`sum\`
    }
  },
  dimensions: {
    id: {
      sql: \`id\`,
      type: \`number\`,
      primaryKey: true
    },
    createdAt: {
      sql: \`created_at\`,
      type: \`time\`
    }
  }
});`,
};
