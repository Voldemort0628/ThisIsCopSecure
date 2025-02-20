import { parse } from 'papaparse';

export interface CSVEntry {
  email: string;
  profileName: string;
  onlyOneCheckout: boolean;
  nameOnCard: string;
  cardType: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  sameBillingShipping: boolean;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingAddress2: string;
  shippingAddress3: string;
  shippingPostCode: string;
  shippingCity: string;
  shippingState: string;
  shippingCountry: string;
  billingName: string;
  billingPhone: string;
  billingAddress: string;
  billingAddress2: string;
  billingAddress3: string;
  billingPostCode: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  size?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  entries: CSVEntry[];
}

export class CSVValidator {
  static readonly REQUIRED_HEADERS = [
    'Email Address',
    'Profile Name',
    'Only One Checkout',
    'Name on Card',
    'Card Type',
    'Card Number',
    'Expiration Month',
    'Expiration Year',
    'CVV',
    'Same Billing/Shipping',
    'Shipping Name',
    'Shipping Phone',
    'Shipping Address',
    'Shipping Address 2',
    'Shipping Address 3',
    'Shipping Post Code',
    'Shipping City',
    'Shipping State',
    'Shipping Country',
    'Billing Name',
    'Billing Phone',
    'Billing Address',
    'Billing Address 2',
    'Billing Address 3',
    'Billing Post Code',
    'Billing City',
    'Billing State',
    'Billing Country',
    'Size (Optional)'
  ];

  static validateCSV(csvContent: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      entries: []
    };

    // Parse CSV
    const parsed = parse(csvContent, {
      header: true,
      skipEmptyLines: true
    });

    // Check for parsing errors
    if (parsed.errors.length > 0) {
      result.isValid = false;
      result.errors.push('Failed to parse CSV file');
      return result;
    }

    // Validate headers
    const headers = Object.keys(parsed.data[0] || {});
    const missingHeaders = this.REQUIRED_HEADERS.filter(
      header => !headers.includes(header)
    );

    if (missingHeaders.length > 0) {
      result.isValid = false;
      result.errors.push(`Missing required headers: ${missingHeaders.join(', ')}`);
      return result;
    }

    // Validate entries
    const uniqueEmails = new Set<string>();
    const uniqueCards = new Set<string>();
    const uniqueAddresses = new Set<string>();

    parsed.data.forEach((row: any, index: number) => {
      // Check for duplicate email
      if (uniqueEmails.has(row['Email Address'])) {
        result.errors.push(`Duplicate email address found at row ${index + 2}`);
        result.isValid = false;
      }
      uniqueEmails.add(row['Email Address']);

      // Check for duplicate card number (last 4 digits)
      const cardLast4 = row['Card Number'].slice(-4);
      if (uniqueCards.has(cardLast4)) {
        result.errors.push(`Duplicate card number found at row ${index + 2}`);
        result.isValid = false;
      }
      uniqueCards.add(cardLast4);

      // Create unique address key
      const addressKey = `${row['Shipping Address']}-${row['Shipping Post Code']}`.toLowerCase();
      if (uniqueAddresses.has(addressKey)) {
        result.errors.push(`Duplicate shipping address found at row ${index + 2}`);
        result.isValid = false;
      }
      uniqueAddresses.add(addressKey);

      // Validate required fields
      const requiredFields = [
        'Email Address',
        'Profile Name',
        'Name on Card',
        'Card Number',
        'Expiration Month',
        'Expiration Year',
        'CVV',
        'Shipping Name',
        'Shipping Address',
        'Shipping Post Code',
        'Shipping City',
        'Shipping State',
        'Shipping Country'
      ];

      requiredFields.forEach(field => {
        if (!row[field]) {
          result.errors.push(`Missing required field "${field}" at row ${index + 2}`);
          result.isValid = false;
        }
      });

      // Add valid entry to result
      if (result.isValid) {
        result.entries.push({
          email: row['Email Address'],
          profileName: row['Profile Name'],
          onlyOneCheckout: row['Only One Checkout'] === 'true',
          nameOnCard: row['Name on Card'],
          cardType: row['Card Type'],
          cardNumber: row['Card Number'],
          expirationMonth: row['Expiration Month'],
          expirationYear: row['Expiration Year'],
          cvv: row['CVV'],
          sameBillingShipping: row['Same Billing/Shipping'] === 'true',
          shippingName: row['Shipping Name'],
          shippingPhone: row['Shipping Phone'],
          shippingAddress: row['Shipping Address'],
          shippingAddress2: row['Shipping Address 2'],
          shippingAddress3: row['Shipping Address 3'],
          shippingPostCode: row['Shipping Post Code'],
          shippingCity: row['Shipping City'],
          shippingState: row['Shipping State'],
          shippingCountry: row['Shipping Country'],
          billingName: row['Billing Name'],
          billingPhone: row['Billing Phone'],
          billingAddress: row['Billing Address'],
          billingAddress2: row['Billing Address 2'],
          billingAddress3: row['Billing Address 3'],
          billingPostCode: row['Billing Post Code'],
          billingCity: row['Billing City'],
          billingState: row['Billing State'],
          billingCountry: row['Billing Country'],
          size: row['Size (Optional)']
        });
      }
    });

    return result;
  }

  static mergeCSVs(existingEntries: CSVEntry[], newEntries: CSVEntry[]): CSVEntry[] {
    const merged = [...existingEntries];
    const existingEmails = new Set(existingEntries.map(entry => entry.email));
    
    // Add new entries that don't exist in the current list
    newEntries.forEach(entry => {
      if (!existingEmails.has(entry.email)) {
        merged.push(entry);
      }
    });

    return merged;
  }

  static generateCSV(entries: CSVEntry[]): string {
    // Ensure exact AYCD format
    const headers = this.REQUIRED_HEADERS.join(',') + '\n';
    
    const rows = entries.map(entry => {
      // Convert boolean values to strings
      const onlyOneCheckout = entry.onlyOneCheckout ? 'true' : 'false';
      const sameBillingShipping = entry.sameBillingShipping ? 'true' : 'false';

      // Ensure all fields are present in the correct order
      return [
        entry.email || '',
        entry.profileName || '',
        onlyOneCheckout,
        entry.nameOnCard || '',
        entry.cardType || '',
        entry.cardNumber || '',
        entry.expirationMonth || '',
        entry.expirationYear || '',
        entry.cvv || '',
        sameBillingShipping,
        entry.shippingName || '',
        entry.shippingPhone || '',
        entry.shippingAddress || '',
        entry.shippingAddress2 || '',
        entry.shippingAddress3 || '',
        entry.shippingPostCode || '',
        entry.shippingCity || '',
        entry.shippingState || '',
        entry.shippingCountry || 'United States', // Default to United States
        entry.billingName || '',
        entry.billingPhone || '',
        entry.billingAddress || '',
        entry.billingAddress2 || '',
        entry.billingAddress3 || '',
        entry.billingPostCode || '',
        entry.billingCity || '',
        entry.billingState || '',
        entry.billingCountry || 'United States', // Default to United States
        entry.size || ''
      ].join(',');
    });

    return headers + rows.join('\n');
  }
}