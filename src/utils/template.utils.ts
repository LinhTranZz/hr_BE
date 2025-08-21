import fs from 'fs';
import path from 'path';

export class TemplateUtils {
    /**
     * Đọc template HTML từ file
     * @param templateName Tên file template (không cần .html)
     * @returns Nội dung template
     */
    static readTemplate(templateName: string): string {
        const templatePath = path.join(__dirname, '../templates/email', `${templateName}.html`);
        return fs.readFileSync(templatePath, 'utf8');
    }

    /**
     * Render template với các biến
     * @param template Nội dung template
     * @param variables Object chứa các biến
     * @returns Template đã được render
     */
    static renderTemplate(template: string, variables: Record<string, any>): string {
        let rendered = template;
        
        // Thay thế các biến {{variable}}
        Object.keys(variables).forEach(key => {
            const value = variables[key] || '';
            const regex = new RegExp(`{{${key}}}`, 'g');
            rendered = rendered.replace(regex, value);
        });

        // Xử lý conditional blocks {{#if condition}}...{{/if}}
        rendered = this.processConditionals(rendered, variables);
        
        return rendered;
    }

    /**
     * Xử lý conditional blocks trong template
     * @param template Nội dung template
     * @param variables Object chứa các biến
     * @returns Template đã được xử lý conditional
     */
    private static processConditionals(template: string, variables: Record<string, any>): string {
        const conditionalRegex = /\{\{#if\s+(\w+)}}([\s\S]*?)\{\{\/if}}/g;
        
        return template.replace(conditionalRegex, (match, condition, content) => {
            if (variables[condition]) {
                return content;
            }
            return '';
        });
    }

    /**
     * Render template từ file với các biến
     * @param templateName Tên file template
     * @param variables Object chứa các biến
     * @returns Template đã được render
     */
    static renderTemplateFromFile(templateName: string, variables: Record<string, any>): string {
        const template = this.readTemplate(templateName);
        return this.renderTemplate(template, variables);
    }
} 