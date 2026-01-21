import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
    FormView,
    ReaderView,
    ActionListView,
    ActionGridView,
    QRScanView,
    QRDisplayView,
    MessageView,
    CardView,
    CarouselView,
    TimelineView,
    MediaView,
    MapView,
} from "@numerum-tech/cmsdk";

const server = new Server(
    {
        name: "cmsdk-mcp-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "create_form_view",
                description: "Generate a FormView JSON for data collection.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        fields: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    type: { type: "string" },
                                    id: { type: "string" },
                                    label: { type: "string" },
                                    required: { type: "boolean" },
                                    options: { type: "array" },
                                    min: { type: "number" },
                                    max: { type: "number" },
                                },
                            },
                        },
                        submitLabel: { type: "string" },
                        submitMethod: { type: "string" },
                        next: { type: "string" },
                        prev: { type: "string" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_reader_view",
                description: "Generate a ReaderView JSON for rich content display.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        content: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    type: { type: "string", enum: ["paragraph", "title", "subtitle", "image", "markdown", "list", "separator"] },
                                    value: { type: "any" },
                                    alt: { type: "string" },
                                    caption: { type: "string" },
                                },
                            },
                        },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_action_list_view",
                description: "Generate an ActionListView JSON for navigation menus.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        actions: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    label: { type: "string" },
                                    description: { type: "string" },
                                    icon: { type: "string" },
                                },
                            },
                        },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_action_grid_view",
                description: "Generate an ActionGridView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        columns: { type: "number" },
                        spacing: { type: "number" },
                        actions: { type: "array" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_qr_scan_view",
                description: "Generate a QRScanView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        submitLabel: { type: "string" },
                        validation: { type: "object" },
                        preview: { type: "boolean" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_qr_display_view",
                description: "Generate a QRDisplayView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        qrCode: {
                            type: "object",
                            properties: {
                                imageUrl: { type: "string" },
                                title: { type: "string" },
                                description: { type: "string" },
                                options: { type: "object" },
                            },
                            required: ["imageUrl", "title"],
                        },
                    },
                    required: ["id", "title", "qrCode"],
                },
            },
            {
                name: "create_card_view",
                description: "Generate a CardView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        subtitle: { type: "string" },
                        description: { type: "string" },
                        image: { type: "string" },
                        stats: { type: "array" },
                        sections: { type: "array" },
                        actions: { type: "array" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_carousel_view",
                description: "Generate a CarouselView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        slides: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    title: { type: "string" },
                                    subtitle: { type: "string" },
                                    options: { type: "object" },
                                    actions: { type: "array" },
                                },
                            },
                        },
                        settings: { type: "object" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_timeline_view",
                description: "Generate a TimelineView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        events: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    title: { type: "string" },
                                    date: { type: "string" },
                                    options: { type: "object" },
                                },
                            },
                        },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_media_view",
                description: "Generate a MediaView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "string" },
                                    kind: { type: "string", enum: ["video", "audio"] },
                                    url: { type: "string" },
                                    options: { type: "object" },
                                },
                            },
                        },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_map_view",
                description: "Generate a MapView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        viewport: {
                            type: "object",
                            properties: {
                                lat: { type: "number" },
                                lon: { type: "number" },
                                zoom: { type: "number" },
                            },
                        },
                        markers: { type: "array" },
                        controls: { type: "object" },
                    },
                    required: ["id", "title"],
                },
            },
            {
                name: "create_message_view",
                description: "Generate a MessageView JSON.",
                inputSchema: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        intro: { type: "string" },
                        body: { type: "string" },
                        severity: { type: "string", enum: ["info", "success", "warning", "error"] },
                        primaryAction: { type: "object" },
                        secondaryAction: { type: "object" },
                        dismissible: { type: "boolean" },
                    },
                    required: ["id", "title", "body"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "create_form_view": {
                const { id, title, intro, fields, submitLabel, submitMethod, next, prev } = args;
                const view = new FormView(id, title);
                if (intro) view.setIntro(intro);
                if (fields) {
                    fields.forEach((f) => {
                        switch (f.type) {
                            case "text": view.addTextField(f.id, f.label, f.required); break;
                            case "email": view.addEmailField(f.id, f.label, f.required); break;
                            case "tel": view.addPhoneField(f.id, f.label, f.required); break;
                            case "password": view.addPasswordField(f.id, f.label, f.required); break;
                            case "number": view.addNumberField(f.id, f.label, f.required, f.min, f.max); break;
                            case "date": view.addDateField(f.id, f.label, f.required); break;
                            case "select": view.addSelectField(f.id, f.label, f.required, f.options); break;
                            case "checkbox": view.addCheckboxField(f.id, f.label, f.options); break;
                            default: view.addField(f.type, f.id, f.label, { required: f.required });
                        }
                    });
                }
                if (submitLabel) view.submitButton(submitLabel, submitMethod || "POST");
                if (next) view.setNext(next);
                if (prev) view.setPrev(prev);
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_reader_view": {
                const { id, title, intro, content } = args;
                const view = new ReaderView(id, title);
                if (intro) view.setIntro(intro);
                if (content) {
                    content.forEach((c) => {
                        switch (c.type) {
                            case "paragraph": view.addParagraph(c.value); break;
                            case "title": view.addSubTitle(c.value); break;
                            case "subtitle": view.addSubTitle(c.value); break;
                            case "image": view.addImage(c.value, c.alt || "", c.caption || ""); break;
                            case "markdown": view.addMarkdown(c.value); break;
                            case "list": view.addListField(c.value); break;
                            case "separator": view.addSeparator(); break;
                        }
                    });
                }
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_action_list_view": {
                const { id, title, intro, actions } = args;
                const view = new ActionListView(id, title);
                if (intro) view.setIntro(intro);
                if (actions) {
                    actions.forEach((a) => view.addAction(a.id, a.label, a.description || "", a.icon || ""));
                }
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_action_grid_view": {
                const { id, title, intro, columns, spacing, actions } = args;
                const view = new ActionGridView(id, title);
                if (intro) view.setIntro(intro);
                if (columns) view.setColumns(columns);
                if (spacing) view.setSpacing(spacing);
                if (actions) {
                    actions.forEach((a) => view.addAction(a.id, a.label, a.description || "", a.icon || ""));
                }
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_qr_scan_view": {
                const { id, title, intro, submitLabel, validation, preview } = args;
                const view = new QRScanView(id, title);
                if (intro) view.setIntro(intro);
                if (submitLabel) view.submitButton(submitLabel);
                if (validation) view.setValidation(validation.error, validation.format, validation.min, validation.max, validation.prefix);
                if (preview !== undefined) preview ? view.enablePreview() : view.disablePreview();
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_qr_display_view": {
                const { id, title, intro, qrCode } = args;
                const view = new QRDisplayView(id, title);
                if (intro) view.setIntro(intro);
                if (qrCode) view.addQRCodeReader(qrCode.imageUrl, qrCode.title, qrCode.description, qrCode.options);
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_card_view": {
                const { id, title, subtitle, description, image, stats, sections, actions } = args;
                const view = new CardView(id, title);
                if (subtitle) view.setSubtitle(subtitle);
                if (description) view.setDescription(description);
                if (image) view.setImage(image, title);
                if (stats) stats.forEach((s) => view.addStat(s.label, s.value));
                if (sections) sections.forEach((s) => view.addSection(s.title, s.content));
                if (actions) actions.forEach((a) => view.addAction(a.label, a.method || "POST", a.params));
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_carousel_view": {
                const { id, title, slides, settings } = args;
                const view = new CarouselView(id, title);
                if (slides) {
                    slides.forEach((s) => {
                        const slide = view.createSlide(s.id, s.title, s.subtitle, s.options);
                        view.addSlide(slide);
                        if (s.actions) {
                            s.actions.forEach((a) => view.addSlideAction(s.id, a.label, a.method, a.options));
                        }
                    });
                }
                if (settings) view.setSettings(settings);
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_timeline_view": {
                const { id, title, intro, events } = args;
                const view = new TimelineView(id, title);
                if (intro) view.setIntro(intro);
                if (events) {
                    events.forEach((e) => view.addEvent(e.id, e.title, e.date, e.options));
                }
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_media_view": {
                const { id, title, intro, items } = args;
                const view = new MediaView(id, title);
                if (intro) view.setIntro(intro);
                if (items) {
                    items.forEach((item) => {
                        const media = view.createMedia(item.id, item.kind, item.url, item.options);
                        view.addMediaItem(media);
                    });
                }
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_map_view": {
                const { id, title, viewport, markers, controls } = args;
                const view = new MapView(id, title);
                if (viewport) {
                    view.setViewport({ lat: viewport.lat, lon: viewport.lon }, { zoom: viewport.zoom });
                }
                if (markers) {
                    markers.forEach((m) => view.addMarker({ id: m.id, title: m.title, description: m.description, location: { lat: m.lat, lon: m.lng } }));
                }
                if (controls) view.setControls(controls);
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            case "create_message_view": {
                const { id, title, intro, body, severity, primaryAction, secondaryAction, dismissible } = args;
                const view = new MessageView(id, title);
                if (intro) view.setIntro(intro);
                if (body) view.setBody(body);
                if (severity) view.setSeverity(severity);
                if (primaryAction) view.setPrimaryAction(primaryAction.label, primaryAction.method || "POST");
                if (secondaryAction) view.setSecondaryAction(secondaryAction.label, secondaryAction.method || "POST");
                if (dismissible !== undefined) view.setDismissible(dismissible);
                return { content: [{ type: "text", text: JSON.stringify(view.toJSON(), null, 2) }] };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error.message}` }],
            isError: true,
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("CMSDK MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
