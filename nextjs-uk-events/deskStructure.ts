import { StructureBuilder } from 'sanity/structure'
import { Folder, LayoutTemplate, FileText } from 'lucide-react'

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.listItem()
        .title('Pages ( each page of the website )')
        .icon(FileText)
        .child(
          S.list()
            .title('Pages ( each page of the website )')
            .items([
              S.documentTypeListItem('contactPage').title('Contact Page'),
              S.documentTypeListItem('cocktailBarHire').title('Cocktail Bar Hire Page'),
              S.documentTypeListItem('mobileBarHirePackages').title('Mobile Bar Hire Packages'),
              S.documentTypeListItem('entertainmentPage').title('Entertainment Page'),
              S.documentTypeListItem('masterclassPage').title('Master Class Page'),
              S.documentTypeListItem('aboutUsPage').title('About Page'),
              S.documentTypeListItem('privacyPolicyPage').title('Privacy Policy'),
              S.documentTypeListItem('termsAndConditionsPage').title('Terms & Conditions'),
            ]),
        ),

      S.divider(),

      // Sections
      S.listItem()
        .title('Page Sections (ex.: Hero Section )')
        .icon(Folder)
        .child(
          S.list()
            .title('Sections')
            .items([
              S.documentTypeListItem('hero').title('Hero Section'),
              S.documentTypeListItem('marqueeSection').title('Marquee Section'),
              S.documentTypeListItem('about').title('About Section'),
              S.documentTypeListItem('whyus').title('Why Us Section'),
              S.documentTypeListItem('TextMarqueeSection').title('Text Marquee Section'),
              S.documentTypeListItem('TextImgSectionRight').title('Text + Image Right'),
              S.documentTypeListItem('TextImgSectionLeft').title('Text + Image Left'),
              S.documentTypeListItem('carouselSection').title('Carousel Section'),
              S.documentTypeListItem('embed').title('Video Embed Section'),
            ]),
        ),

      S.divider(),

      // Layout
      S.listItem()
        .title('Site Layout ( Header + Footer + Cookies )')
        .icon(LayoutTemplate)
        .child(
          S.list()
            .title('Layout')
            .items([
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('footer').title('Footer'),
              S.documentTypeListItem('cookies').title('Cookies'),
            ]),
        ),
    ])

export default structure
